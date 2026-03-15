import { useState, useRef, useEffect, useCallback } from 'react';
import type { LatLng } from '@/types';
import { haversineDistance, interpolateAlongPath, calculateBearing } from '@/lib/utils';
import { getRoute, decodeRouteToLatLngs } from '@/services/routing';

export interface CabTrackingOptions {
  driverStartPosition: LatLng;
  userPosition: LatLng;
  dropPosition?: LatLng;
  rideStatus: 'idle' | 'approaching' | 'arrived' | 'in_ride' | 'completed';
  updateIntervalMs?: number;
  simulationSpeed?: number;
}

export interface CabTrackingResult {
  cabPosition: LatLng | null;
  bearing: number;
  distanceToTarget: number;
  etaSeconds: number;
  pathTravelled: LatLng[];
  routeWaypoints: LatLng[];
  isSimulating: boolean;
  isFetchingRoute: boolean;
  startTracking: () => void;
  stopTracking: () => void;
  resetTracking: (newStart: LatLng) => void;
}

export function useCabTracking(options: CabTrackingOptions): CabTrackingResult {
  const {
    driverStartPosition,
    userPosition,
    dropPosition,
    rideStatus,
    updateIntervalMs = 2500,
    simulationSpeed = 10,
  } = options;

  const [cabPosition, setCabPosition] = useState<LatLng | null>(null);
  const [bearing, setBearing] = useState(0);
  const [distanceToTarget, setDistanceToTarget] = useState(0);
  const [etaSeconds, setEtaSeconds] = useState(0);
  const [pathTravelled, setPathTravelled] = useState<LatLng[]>([]);
  const [routeWaypoints, setRouteWaypoints] = useState<LatLng[]>([]);
  const [isSimulating, setIsSimulating] = useState(false);
  const [isFetchingRoute, setIsFetchingRoute] = useState(false);

  const waypointsRef = useRef<LatLng[]>([]);
  const travelledDistanceRef = useRef(0);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const prevPositionRef = useRef<LatLng | null>(null);

  const getTarget = useCallback((): LatLng => {
    if (rideStatus === 'in_ride' && dropPosition) return dropPosition;
    return userPosition;
  }, [rideStatus, dropPosition, userPosition]);

  const fetchRoute = useCallback(
    async (from: LatLng, to: LatLng) => {
      setIsFetchingRoute(true);
      try {
        const route = await getRoute(from, to);
        const waypoints = decodeRouteToLatLngs(route);
        waypointsRef.current = waypoints;
        setRouteWaypoints(waypoints);
        travelledDistanceRef.current = 0;

        if (waypoints.length > 0) {
          setCabPosition(waypoints[0]);
          prevPositionRef.current = waypoints[0];
        }

        let totalDist = 0;
        for (let i = 0; i < waypoints.length - 1; i++) {
          totalDist += haversineDistance(waypoints[i], waypoints[i + 1]);
        }
        setDistanceToTarget(totalDist);
        setEtaSeconds(Math.round(totalDist / simulationSpeed * (updateIntervalMs / 1000)));
      } catch {
        const waypoints = [from, to];
        waypointsRef.current = waypoints;
        setRouteWaypoints(waypoints);
        travelledDistanceRef.current = 0;
        setCabPosition(from);
        prevPositionRef.current = from;
        const dist = haversineDistance(from, to);
        setDistanceToTarget(dist);
        setEtaSeconds(Math.round(dist / simulationSpeed * (updateIntervalMs / 1000)));
      } finally {
        setIsFetchingRoute(false);
      }
    },
    [simulationSpeed, updateIntervalMs]
  );

  const tick = useCallback(() => {
    const waypoints = waypointsRef.current;
    if (waypoints.length < 2) return;

    travelledDistanceRef.current += simulationSpeed;
    const newPos = interpolateAlongPath(waypoints, travelledDistanceRef.current);

    if (prevPositionRef.current) {
      const newBearing = calculateBearing(prevPositionRef.current, newPos);
      if (haversineDistance(prevPositionRef.current, newPos) > 1) {
        setBearing(newBearing);
      }
    }

    prevPositionRef.current = newPos;
    setCabPosition(newPos);
    setPathTravelled((prev) => [...prev, newPos]);

    const target = waypoints[waypoints.length - 1];
    const dist = haversineDistance(newPos, target);
    setDistanceToTarget(dist);
    setEtaSeconds(Math.round(dist / simulationSpeed * (updateIntervalMs / 1000)));

    if (dist < 20) {
      setCabPosition(target);
      setDistanceToTarget(0);
      setEtaSeconds(0);
      setIsSimulating(false);
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
    }
  }, [simulationSpeed, updateIntervalMs]);

  const startTracking = useCallback(() => {
    if (isSimulating) return;
    setIsSimulating(true);
    intervalRef.current = setInterval(tick, updateIntervalMs);
  }, [isSimulating, tick, updateIntervalMs]);

  const stopTracking = useCallback(() => {
    setIsSimulating(false);
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  }, []);

  const resetTracking = useCallback(
    (newStart: LatLng) => {
      stopTracking();
      travelledDistanceRef.current = 0;
      setPathTravelled([]);
      prevPositionRef.current = null;
      setCabPosition(newStart);
      const target = getTarget();
      fetchRoute(newStart, target);
    },
    [stopTracking, fetchRoute, getTarget]
  );

  useEffect(() => {
    if (rideStatus === 'approaching') {
      fetchRoute(driverStartPosition, userPosition).then(() => {
        setIsSimulating(true);
        intervalRef.current = setInterval(tick, updateIntervalMs);
      });
    } else if (rideStatus === 'in_ride' && dropPosition) {
      stopTracking();
      travelledDistanceRef.current = 0;
      setPathTravelled([]);
      fetchRoute(userPosition, dropPosition).then(() => {
        setIsSimulating(true);
        intervalRef.current = setInterval(tick, updateIntervalMs);
      });
    } else if (rideStatus === 'completed' || rideStatus === 'idle') {
      stopTracking();
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
    };
  }, [rideStatus]);

  return {
    cabPosition,
    bearing,
    distanceToTarget,
    etaSeconds,
    pathTravelled,
    routeWaypoints,
    isSimulating,
    isFetchingRoute,
    startTracking,
    stopTracking,
    resetTracking,
  };
}
