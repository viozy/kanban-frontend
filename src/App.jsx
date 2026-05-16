import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import KanbanBoard from './components/KanbanBoard';
import Footer from './components/Footer';

function App() {
  const [darkMode, setDarkMode] = useState(() => {
    // Checa se o usuário já escolheu um tema antes (salvo no localStorage)
    const saved = localStorage.getItem('theme');
    if (saved) return saved === 'dark';
    // Se não, usa a preferência do sistema operacional
    return window.matchMedia('(prefers-color-scheme: dark)').matches;
  });

  useEffect(() => {
    // Aplica a classe 'dark' no <html> e salva a preferência
    if (darkMode) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  }, [darkMode]);

  return (
    <div className="min-h-screen flex flex-col bg-gray-50 dark:bg-dark-900 transition-colors duration-300">
      <Navbar darkMode={darkMode} setDarkMode={setDarkMode} />
      <main className="flex-1 container mx-auto px-4 py-8">
        {/* Hero section com glow */}
        <div className="relative mb-10 text-center">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-96 h-96 bg-purple-500/10 dark:bg-purple-500/20 rounded-full blur-[120px] pointer-events-none" />
          <p className="text-purple-500 dark:text-purple-400 text-sm font-medium tracking-wider uppercase mb-2 relative">
            Kanban Board
          </p>
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white relative">
            Organize suas tarefas
          </h1>
          <p className="text-gray-500 dark:text-gray-400 mt-3 max-w-md mx-auto relative">
            Arraste os cards entre as colunas para gerenciar o progresso dos seus projetos.
          </p>
        </div>

        <KanbanBoard />
      </main>
      <Footer />
    </div>
  );
}

export default App;
