import React from 'react';
import { Moon, Sun } from 'lucide-react';

function ThemeToggle({ darkMode, setDarkMode }) {
  return (
    <button
      onClick={() => setDarkMode(!darkMode)}
      className="w-9 h-9 rounded-full border border-gray-300 dark:border-dark-600 flex items-center justify-center text-gray-600 dark:text-gray-400 hover:text-purple-500 dark:hover:text-purple-400 hover:border-purple-500 dark:hover:border-purple-500 transition-all"
      aria-label={darkMode ? 'Ativar modo claro' : 'Ativar modo escuro'}
    >
      {darkMode ? <Sun size={16} /> : <Moon size={16} />}
    </button>
  );
}

export default ThemeToggle;
