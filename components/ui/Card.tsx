import React from 'react';

interface CardProps {
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
}

const Card: React.FC<CardProps> = ({ children, className = '', onClick }) => {
  const interactiveClasses = onClick 
    ? 'transition-all duration-300 hover:border-sky-500 hover:bg-slate-800/30 hover:scale-[1.02] hover:shadow-lg hover:shadow-sky-500/10' 
    : '';

  return (
    <div
      className={`bg-slate-900 border border-slate-800 rounded-xl shadow-lg ${interactiveClasses} ${className}`}
      onClick={onClick}
    >
      {children}
    </div>
  );
};

export default Card;