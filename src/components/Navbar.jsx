import React from 'react';
import { LayoutDashboard } from 'lucide-react';
import ThemeToggle from './ThemeToggle';

function Navbar({ darkMode, setDarkMode }) {
  return (
    <nav className="border-b border-gray-200 dark:border-dark-600 bg-white/80 dark:bg-dark-900/80 backdrop-blur-md sticky top-0 z-50 transition-colors duration-300">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        {/* Logo */}
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-purple-500 rounded-lg flex items-center justify-center">
            <LayoutDashboard size={18} className="text-white" />
          </div>
          <span className="text-lg font-semibold text-gray-900 dark:text-white">TaskFlow</span>
        </div>

        {/* Links */}
        <div className="hidden md:flex items-center gap-8 text-sm text-gray-500 dark:text-gray-300">
          <a href="#" className="hover:text-gray-900 dark:hover:text-white transition-colors">Home</a>
          <a href="#" className="text-gray-900 dark:text-white font-medium">Kanban</a>
          <a href="#" className="hover:text-gray-900 dark:hover:text-white transition-colors">Projetos</a>
          <a href="#" className="hover:text-gray-900 dark:hover:text-white transition-colors">Docs</a>
        </div>

        {/* Actions */}
        <div className="flex items-center gap-3">
          <ThemeToggle darkMode={darkMode} setDarkMode={setDarkMode} />
          <button className="px-4 py-2 text-sm border border-purple-500 text-purple-500 dark:text-purple-400 rounded-full hover:bg-purple-500 hover:text-white transition-all">
            Novo Projeto
          </button>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
