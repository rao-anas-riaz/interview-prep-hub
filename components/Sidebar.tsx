import React, { memo } from 'react';
import { QuestionCategoryMetadata } from '../types';
import AnimatedRainbowText from './ui/AnimatedRainbowText';

interface SidebarProps {
  categories: QuestionCategoryMetadata[];
  activeCategoryId: string | null;
  onCategoryClick: (id: string | null) => void;
  isMobileOpen: boolean;
  onMobileClose: () => void;
}

const NavItem: React.FC<{
  category: QuestionCategoryMetadata;
  isActive: boolean;
  onClick: (id: string) => void;
  index: number;
}> = memo(({ category, isActive, onClick, index }) => (
  <li>
    <a
      href="#"
      onClick={(e) => {
        e.preventDefault();
        onClick(category.id);
      }}
      className={`flex items-center py-2.5 text-sm font-medium rounded-lg transition-all duration-200 group px-3 hover:translate-x-1 ${
        isActive
          ? 'bg-sky-500/10 text-sky-300'
          : `text-slate-400 hover:bg-slate-700/50 hover:text-slate-200 ${
              index % 2 !== 0 ? 'bg-slate-900' : ''
            }`
      }`}
    >
      <i className={`fas ${category.icon} w-6 h-6 text-center text-lg transition duration-75 ${isActive ? 'text-sky-400' : 'text-slate-500 group-hover:text-slate-400'}`}></i>
      <span className="ml-3 whitespace-nowrap">{category.title}</span>
    </a>
  </li>
));

const Sidebar: React.FC<SidebarProps> = ({ categories, activeCategoryId, onCategoryClick, isMobileOpen, onMobileClose }) => {
  return (
    <>
      {/* Mobile overlay */}
      <div
        onClick={onMobileClose}
        className={`fixed inset-0 bg-slate-900/60 z-40 transition-opacity duration-300 ${isMobileOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
        aria-hidden="true"
      />

      {/* Sidebar */}
      <aside className={`fixed top-0 left-0 z-50 h-screen w-72 bg-slate-950 border-r border-slate-800 flex flex-col transition-transform duration-300 ease-in-out ${isMobileOpen ? 'translate-x-0' : '-translate-x-full'}`}>
         <div className="flex items-center justify-center p-4 border-b border-slate-800 h-16 flex-shrink-0">
           <button onClick={() => onCategoryClick(null)} className="flex items-center group px-4 py-2 rounded-lg transition-colors">
              <h1 className="text-xl font-bold font-lexend">
                <AnimatedRainbowText>Interview Prep Hub</AnimatedRainbowText>
              </h1>
           </button>
         </div>
        <div className="flex-grow overflow-y-auto px-4 py-4">
          <h2 className="px-3 pb-2 text-xs font-semibold text-slate-500 uppercase tracking-wider">Categories</h2>
          <ul className="space-y-1.5">
            {categories.map((cat, index) => (
              <NavItem key={cat.id} category={cat} isActive={activeCategoryId === cat.id} onClick={() => onCategoryClick(cat.id)} index={index} />
            ))}
          </ul>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;