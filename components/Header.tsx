import React from 'react';
import AnimatedRainbowText from './ui/AnimatedRainbowText';

interface HeaderProps {
  onMenuClick: () => void;
  categoryTitle?: string;
}

const Header: React.FC<HeaderProps> = ({ onMenuClick, categoryTitle }) => {
  const title = categoryTitle || 'Curated by Anas Riaz';
  
  return (
    <header className="fixed top-0 left-0 right-0 h-16 bg-slate-950/80 backdrop-blur-sm border-b border-slate-800 flex items-center justify-between px-4 z-30">
      {/* Left section */}
      <div className="flex-1 flex justify-start">
        <button onClick={onMenuClick} className="text-slate-300 hover:text-white transition-colors p-2 -ml-2">
          <i className="fas fa-bars text-xl"></i>
          <span className="sr-only">Open Menu</span>
        </button>
      </div>
      
      {/* Center section (Title) */}
      <div className="flex-1 flex justify-center">
        <h1 className={`font-bold font-lexend truncate ${categoryTitle ? 'text-lg' : 'text-base'}`}>
            <AnimatedRainbowText>{title}</AnimatedRainbowText>
        </h1>
      </div>

      {/* Right section */}
      <div className="flex-1 flex justify-end">
        {!categoryTitle ? (
          <div className="flex items-center space-x-3">
            <a href="https://github.com/rao-anas-riaz" target="_blank" rel="noopener noreferrer" className="text-slate-400 hover:text-white transition-all transform hover:scale-110">
              <i className="fab fa-github text-lg"></i>
            </a>
            <a href="https://www.linkedin.com/in/raoanasriaz/" target="_blank" rel="noopener noreferrer" className="text-slate-400 hover:text-white transition-all transform hover:scale-110">
              <i className="fab fa-linkedin text-lg"></i>
            </a>
            <a href="mailto:raoanasriaz@gmail.com" className="text-slate-400 hover:text-white transition-all transform hover:scale-110">
              <i className="fas fa-envelope text-lg"></i>
            </a>
          </div>
        ) : (
          <div className="w-8 h-8"></div> /* Spacer to balance hamburger */
        )}
      </div>
    </header>
  );
};

export default Header;