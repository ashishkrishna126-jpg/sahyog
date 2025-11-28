import { motion } from 'framer-motion';

interface RedRibbonProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg';
}

export default function RedRibbon({ className = '', size = 'md' }: RedRibbonProps) {
  const sizes = {
    sm: 'w-8 h-12',
    md: 'w-12 h-16',
    lg: 'w-20 h-28',
  };

  return (
    <motion.div
      className={`relative ${sizes[size]} ${className}`}
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      whileHover={{ scale: 1.1, rotate: 5 }}
    >
      {/* Ribbon Loop */}
      <svg
        viewBox="0 0 100 150"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full drop-shadow-xl filter"
      >
        <defs>
          <linearGradient id="ribbonGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#ff4d6d" />
            <stop offset="50%" stopColor="#d90429" />
            <stop offset="100%" stopColor="#8d0018" />
          </linearGradient>
          <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="5" result="blur" />
            <feComposite in="SourceGraphic" in2="blur" operator="over" />
          </filter>
        </defs>
        
        {/* The Ribbon Path */}
        <motion.path
          d="M50 30 C 80 0, 100 40, 70 70 L 30 130 L 20 120 L 60 60 C 40 40, 20 40, 50 30 Z"
          fill="url(#ribbonGradient)"
          stroke="#9f1239"
          strokeWidth="1"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 2, ease: "easeInOut" }}
        />
        
        {/* Crossing part */}
        <motion.path
          d="M50 30 C 20 0, 0 40, 30 70 L 70 130 L 80 120 L 40 60"
          fill="url(#ribbonGradient)"
          stroke="#9f1239"
          strokeWidth="1"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 2, ease: "easeInOut", delay: 0.5 }}
        />
      </svg>
      
      {/* Shine Effect */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/30 to-transparent rounded-full"
        animate={{
          x: ['-100%', '200%'],
        }}
        transition={{
          duration: 3,
          repeat: Infinity,
          ease: "linear",
          delay: 1,
        }}
        style={{ clipPath: 'path("M50 30 C 80 0, 100 40, 70 70 L 30 130 L 20 120 L 60 60 C 40 40, 20 40, 50 30 Z")' }}
      />
    </motion.div>
  );
}
