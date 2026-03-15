import { useState } from 'react';
import { motion } from 'framer-motion';
import { Star } from 'lucide-react';

interface RatingStarsProps {
  rating?: number;
  size?: number;
  interactive?: boolean;
  onRate?: (rating: number) => void;
}

export default function RatingStars({ rating = 0, size = 24, interactive = false, onRate }: RatingStarsProps) {
  const [hovered, setHovered] = useState(0);
  const [selected, setSelected] = useState(rating);

  const displayRating = interactive ? (hovered || selected) : rating;

  return (
    <div className="flex items-center gap-1">
      {[1, 2, 3, 4, 5].map((star) => (
        <motion.button
          key={star}
          type="button"
          disabled={!interactive}
          onClick={() => {
            if (interactive) {
              setSelected(star);
              onRate?.(star);
            }
          }}
          onMouseEnter={() => interactive && setHovered(star)}
          onMouseLeave={() => interactive && setHovered(0)}
          whileTap={interactive ? { scale: 1.3 } : undefined}
          transition={{ type: 'spring', stiffness: 400, damping: 15 }}
          className="disabled:cursor-default"
        >
          <Star
            size={size}
            className={star <= displayRating ? 'fill-[var(--primary)] text-[var(--primary)]' : 'text-[var(--border-strong)]'}
          />
        </motion.button>
      ))}
    </div>
  );
}
