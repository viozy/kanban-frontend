import React from 'react';
import { Github, Instagram, Twitter, Twitch } from 'lucide-react';

function Footer() {
  const socialLinks = [
    { icon: Github, href: '#', label: 'GitHub' },
    { icon: Instagram, href: '#', label: 'Instagram' },
    { icon: Twitter, href: '#', label: 'Twitter' },
    { icon: Twitch, href: '#', label: 'Twitch' },
  ];

  return (
    <footer className="border-t border-gray-200 dark:border-dark-600 bg-white dark:bg-dark-800 py-8 mt-auto transition-colors duration-300">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          {/* Logo + Copyright */}
          <div className="text-gray-500 dark:text-gray-400 text-sm">
            © 2025 TaskFlow. Projeto de estudo.
          </div>

          {/* Redes sociais */}
          <div className="flex items-center gap-4">
            {socialLinks.map(({ icon: Icon, href, label }) => (
              <a
                key={label}
                href={href}
                aria-label={label}
                className="w-9 h-9 rounded-full border border-gray-200 dark:border-dark-600 flex items-center justify-center text-gray-400 hover:text-purple-500 dark:hover:text-purple-400 hover:border-purple-500 dark:hover:border-purple-500 transition-all"
              >
                <Icon size={16} />
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
