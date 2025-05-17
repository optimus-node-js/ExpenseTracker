import React, { useState, useEffect, useRef } from 'react';
import { motion, useInView } from 'framer-motion';

interface CountUpProps {
  end: number;
  duration?: number;
  prefix?: string;
  suffix?: string;
  separator?: string;
  decimals?: number;
  delay?: number;
}

export default function CountUpAnimation({
  end,
  duration = 2,
  prefix = '',
  suffix = '',
  separator = ',',
  decimals = 0,
  delay = 0,
}: CountUpProps) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });
  const [hasAnimated, setHasAnimated] = useState(false);

  // Format the number with commas as thousands separators
  const formatNumber = (num: number) => {
    return num.toLocaleString('en-IN', {
      minimumFractionDigits: decimals,
      maximumFractionDigits: decimals,
    }).replace(/,/g, separator);
  };

  useEffect(() => {
    if (isInView && !hasAnimated) {
      setHasAnimated(true);
      let startTimestamp: number | null = null;
      const step = (timestamp: number) => {
        if (!startTimestamp) startTimestamp = timestamp;
        const progress = Math.min((timestamp - startTimestamp) / (duration * 1000), 1);
        setCount(Math.floor(progress * end));
        if (progress < 1) {
          window.requestAnimationFrame(step);
        } else {
          setCount(end);
        }
      };
      
      // Add delay before starting animation
      setTimeout(() => {
        window.requestAnimationFrame(step);
      }, delay);
    }
  }, [isInView, end, duration, hasAnimated, delay]);

  return (
    <motion.div 
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
      transition={{ duration: 0.5, delay: delay / 1000 }}
      className="font-bold"
    >
      {prefix}{formatNumber(count)}{suffix}
    </motion.div>
  );
}