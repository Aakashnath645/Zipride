import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { MapPin, Car, CreditCard } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface Slide {
  icon: React.ReactNode;
  heading: string;
  subtext: string;
}

const slides: Slide[] = [
  {
    icon: <MapPin size={64} strokeWidth={1.5} />,
    heading: 'Book in seconds',
    subtext: 'Set your pickup and drop. We\u2019ll handle the rest.',
  },
  {
    icon: <Car size={64} strokeWidth={1.5} />,
    heading: 'Live tracking',
    subtext: 'Watch your ride arrive in real-time on the map.',
  },
  {
    icon: <CreditCard size={64} strokeWidth={1.5} />,
    heading: 'Pay your way',
    subtext: 'UPI, cards, wallet or cash. Your choice.',
  },
];

const slideVariants = {
  enter: (direction: number) => ({
    x: direction > 0 ? 300 : -300,
    opacity: 0,
  }),
  center: {
    x: 0,
    opacity: 1,
  },
  exit: (direction: number) => ({
    x: direction > 0 ? -300 : 300,
    opacity: 0,
  }),
};

function Onboarding() {
  const navigate = useNavigate();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(1);

  const isLastSlide = currentIndex === slides.length - 1;

  const goToNext = () => {
    if (isLastSlide) {
      navigate('/login', { replace: true });
      return;
    }
    setDirection(1);
    setCurrentIndex((prev) => prev + 1);
  };

  const goToSlide = (index: number) => {
    setDirection(index > currentIndex ? 1 : -1);
    setCurrentIndex(index);
  };

  return (
    <div className="relative flex h-full w-full flex-col bg-[var(--background)]">
      {/* Skip button */}
      <div className="flex justify-end p-4">
        <button
          type="button"
          onClick={() => navigate('/login', { replace: true })}
          className="text-sm font-medium text-[var(--text-muted)] transition-colors hover:text-[var(--text-primary)] py-2 px-4"
        >
          Skip
        </button>
      </div>

      {/* Slide content */}
      <div className="relative flex flex-1 items-center justify-center overflow-hidden px-8">
        <AnimatePresence custom={direction} mode="wait">
          <motion.div
            key={currentIndex}
            custom={direction}
            variants={slideVariants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ duration: 0.35, ease: 'easeInOut' }}
            className="flex w-full max-w-sm flex-col items-center gap-8 text-center"
          >
            <div className="flex h-32 w-32 items-center justify-center rounded-full bg-[var(--surface-raised)] text-[var(--primary)]">
              {slides[currentIndex].icon}
            </div>

            <div className="flex flex-col gap-3">
              <h2 className="text-2xl font-bold text-[var(--text-primary)]">
                {slides[currentIndex].heading}
              </h2>
              <p className="text-base leading-relaxed text-[var(--text-secondary)]">
                {slides[currentIndex].subtext}
              </p>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Bottom navigation */}
      <div className="flex flex-col items-center gap-6 px-8 pb-12">
        {/* Navigation dots */}
        <div className="flex items-center gap-2">
          {slides.map((_, index) => (
            <button
              type="button"
              key={index}
              onClick={() => goToSlide(index)}
              aria-label={`Go to slide ${index + 1}`}
              className="p-2.5"
            >
              <motion.div
                className="rounded-full"
                animate={{
                  width: index === currentIndex ? 24 : 8,
                  height: 8,
                  backgroundColor:
                    index === currentIndex
                      ? 'var(--primary)'
                      : 'var(--border-strong)',
                }}
                transition={{ duration: 0.25 }}
              />
            </button>
          ))}
        </div>

        {/* Next / Get Started button */}
        <Button
          onClick={goToNext}
          size="lg"
          className="w-full max-w-sm"
        >
          {isLastSlide ? 'Get Started' : 'Next'}
        </Button>
      </div>
    </div>
  );
}

export default Onboarding;
