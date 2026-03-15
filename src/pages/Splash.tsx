import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { LogoIcon } from '@/components/icons';
import { Progress } from '@/components/ui/progress';
import { useUserStore } from '@/stores/userStore';

const SPLASH_DURATION = 2500;

function Splash() {
  const navigate = useNavigate();
  const isAuthenticated = useUserStore((s) => s.isAuthenticated);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const startTime = Date.now();
    let animFrame: number;

    const tick = () => {
      const elapsed = Date.now() - startTime;
      const pct = Math.min((elapsed / SPLASH_DURATION) * 100, 100);
      setProgress(pct);

      if (elapsed < SPLASH_DURATION) {
        animFrame = requestAnimationFrame(tick);
      }
    };

    animFrame = requestAnimationFrame(tick);

    const timeout = setTimeout(() => {
      if (isAuthenticated) {
        navigate('/app/home', { replace: true });
      } else {
        navigate('/onboarding', { replace: true });
      }
    }, SPLASH_DURATION);

    return () => {
      cancelAnimationFrame(animFrame);
      clearTimeout(timeout);
    };
  }, [isAuthenticated, navigate]);

  return (
    <div className="flex h-full w-full flex-col items-center justify-center bg-[var(--background)]">
      <div className="flex flex-1 flex-col items-center justify-center gap-4">
        <motion.div
          initial={{ scale: 0.5, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{
            type: 'spring',
            stiffness: 200,
            damping: 20,
          }}
        >
          <LogoIcon
            size={96}
            color="var(--primary)"
          />
        </motion.div>

        <motion.h1
          className="text-4xl font-bold tracking-tight text-[var(--text-primary)]"
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.4, ease: 'easeOut' }}
        >
          ZipRide
        </motion.h1>

        <motion.p
          className="text-base text-[var(--text-muted)]"
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.4, ease: 'easeOut' }}
        >
          Your city, your pace.
        </motion.p>
      </div>

      <div className="w-full px-12 pb-16">
        <Progress value={progress} className="h-1.5" />
      </div>
    </div>
  );
}

export default Splash;
