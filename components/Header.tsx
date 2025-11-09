import React from 'react';

interface HeaderProps {
  onMenuClick: () => void;
  categoryTitle?: string;
}

const Header: React.FC<HeaderProps> = ({ onMenuClick, categoryTitle }) => {
  return (
    <header className="lg:hidden fixed top-0 left-0 right-0 h-16 bg-slate-950/80 backdrop-blur-sm border-b border-slate-800 flex items-center justify-between px-4 z-30">
      <button onClick={onMenuClick} className="text-slate-300 hover:text-white transition-colors p-2 -ml-2">
        <i className="fas fa-bars text-xl"></i>
        <span className="sr-only">Open Menu</span>
      </button>
      <div className="text-center">
        <h1 className="text-lg font-bold text-white font-lexend truncate">
          {categoryTitle ? categoryTitle : 'Interview Prep Hub'}
        </h1>
      </div>
      <div className="w-8"></div> {/* Spacer to balance the hamburger icon */}
    </header>
  );
};

export default Header;
