import { useState, useCallback } from 'react';
import { useDebounce } from 'use-debounce';
import { Search, MapPin, Clock, Navigation } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { Input } from '@/components/ui/input';
import { useForwardGeocode } from '@/hooks/useForwardGeocode';
import { KOLKATA_SUGGESTIONS } from '@/lib/constants';
import type { Location} from '@/types';

interface LocationSearchProps {
  placeholder?: string;
  onSelect: (location: Location) => void;
  recentSearches?: Location[];
}

export default function LocationSearch({
  placeholder = 'Where to?',
  onSelect,
  recentSearches = [],
}: LocationSearchProps) {
  const [query, setQuery] = useState('');
  const [debouncedQuery] = useDebounce(query, 400);
  const { data: results, isLoading } = useForwardGeocode(debouncedQuery);

  const handleSelect = useCallback(
    (name: string, address: string, lat: number, lng: number) => {
      onSelect({
        name,
        address,
        position: { lat, lng },
      });
      setQuery('');
    },
    [onSelect]
  );

  const showResults = debouncedQuery.length >= 3 && results && results.length > 0;
  const showSuggestions = query.length === 0;

  return (
    <div className="flex flex-col gap-2">
      <div className="relative">
        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[var(--text-muted)]" />
        <Input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder={placeholder}
          className="pl-10 bg-[var(--surface-raised)]"
        />
        {isLoading && (
          <div className="absolute right-3 top-1/2 -translate-y-1/2">
            <div className="h-4 w-4 animate-spin rounded-full border-2 border-[var(--border)] border-t-[var(--primary)]" />
          </div>
        )}
      </div>

      <AnimatePresence mode="wait">
        {showResults && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            className="flex flex-col gap-0.5"
          >
            {results.map((result) => (
              <button
                key={result.place_id}
                onClick={() =>
                  handleSelect(
                    result.display_name.split(',')[0],
                    result.display_name.split(',').slice(1, 3).join(',').trim(),
                    parseFloat(result.lat),
                    parseFloat(result.lon)
                  )
                }
                className="flex items-start gap-3 rounded-lg p-3 text-left hover:bg-[var(--surface-raised)] transition-colors"
              >
                <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-[var(--accent)]" />
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-[var(--text-primary)] truncate">
                    {result.display_name.split(',')[0]}
                  </p>
                  <p className="text-xs text-[var(--text-muted)] truncate">
                    {result.display_name.split(',').slice(1, 4).join(',')}
                  </p>
                </div>
              </button>
            ))}
          </motion.div>
        )}

        {showSuggestions && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="flex flex-col gap-0.5"
          >
            {recentSearches.length > 0 && (
              <div className="mb-2">
                <p className="text-xs font-medium text-[var(--text-muted)] uppercase tracking-wider px-3 mb-1">
                  Recent
                </p>
                {recentSearches.slice(0, 3).map((loc, i) => (
                  <button
                    key={`recent-${i}`}
                    onClick={() => handleSelect(loc.name, loc.address, loc.position.lat, loc.position.lng)}
                    className="flex items-center gap-3 rounded-lg p-3 text-left hover:bg-[var(--surface-raised)] w-full transition-colors"
                  >
                    <Clock className="h-4 w-4 shrink-0 text-[var(--text-muted)]" />
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-[var(--text-primary)] truncate">{loc.name}</p>
                      <p className="text-xs text-[var(--text-muted)] truncate">{loc.address}</p>
                    </div>
                  </button>
                ))}
              </div>
            )}

            <p className="text-xs font-medium text-[var(--text-muted)] uppercase tracking-wider px-3 mb-1">
              Popular in Kolkata
            </p>
            {KOLKATA_SUGGESTIONS.map((sug) => (
              <button
                key={sug.name}
                onClick={() => handleSelect(sug.name, sug.address, sug.lat, sug.lng)}
                className="flex items-center gap-3 rounded-lg p-3 text-left hover:bg-[var(--surface-raised)] w-full transition-colors"
              >
                <Navigation className="h-4 w-4 shrink-0 text-[var(--text-secondary)]" />
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-[var(--text-primary)]">{sug.name}</p>
                  <p className="text-xs text-[var(--text-muted)] truncate">{sug.address}</p>
                </div>
              </button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
