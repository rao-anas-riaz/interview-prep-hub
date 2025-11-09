import React from 'react';

interface AnimatedRainbowTextProps {
  children: React.ReactNode;
  className?: string;
}

const AnimatedRainbowText: React.FC<AnimatedRainbowTextProps> = ({ children, className }) => {
  return (
    <span
      className={`animated-rainbow-text ${className}`}
    >
      {children}
    </span>
  );
};

export default AnimatedRainbowText;
