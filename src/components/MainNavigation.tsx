
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Menu, X, Scale, MessageSquare, FileText, FileScan, Home } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

const MainNavigation = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  const closeMenu = () => setIsMenuOpen(false);

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center">
        <div className="flex items-center mr-4">
          <Link to="/" className="flex items-center space-x-2" onClick={closeMenu}>
            <Scale className="h-6 w-6 text-legal-primary" />
            <span className="font-bold text-xl hidden md:inline-block">Правовой Компас</span>
          </Link>
        </div>

        {/* Mobile menu button */}
        <Button
          variant="ghost"
          className="md:hidden ml-auto"
          onClick={toggleMenu}
          aria-label={isMenuOpen ? "Закрыть меню" : "Открыть меню"}
        >
          {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </Button>

        {/* Desktop navigation */}
        <nav className="hidden md:flex items-center space-x-4 lg:space-x-6 mx-6">
          <Link
            to="/"
            className="text-sm font-medium transition-colors hover:text-primary"
          >
            Главная
          </Link>
          <Link
            to="/chat"
            className="text-sm font-medium transition-colors hover:text-primary"
          >
            Консультация
          </Link>
          <Link
            to="/documents"
            className="text-sm font-medium transition-colors hover:text-primary"
          >
            Документы
          </Link>
          <Link
            to="/analysis"
            className="text-sm font-medium transition-colors hover:text-primary"
          >
            Анализ договоров
          </Link>
        </nav>

        {/* Mobile menu */}
        <div
          className={cn(
            "fixed inset-0 top-16 z-50 grid h-[calc(100vh-4rem)] grid-flow-row auto-rows-max overflow-auto p-6 pb-32 shadow-md animate-in md:hidden bg-background",
            isMenuOpen ? "fade-in-0" : "hidden"
          )}
        >
          <div className="relative z-20 grid gap-6 p-4 rounded-md bg-background">
            <Link
              to="/"
              className="flex items-center space-x-2 text-sm font-medium"
              onClick={closeMenu}
            >
              <Home className="h-5 w-5" />
              <span>Главная</span>
            </Link>
            <Link
              to="/chat"
              className="flex items-center space-x-2 text-sm font-medium"
              onClick={closeMenu}
            >
              <MessageSquare className="h-5 w-5" />
              <span>Консультация</span>
            </Link>
            <Link
              to="/documents"
              className="flex items-center space-x-2 text-sm font-medium"
              onClick={closeMenu}
            >
              <FileText className="h-5 w-5" />
              <span>Документы</span>
            </Link>
            <Link
              to="/analysis"
              className="flex items-center space-x-2 text-sm font-medium"
              onClick={closeMenu}
            >
              <FileScan className="h-5 w-5" />
              <span>Анализ договоров</span>
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
};

export default MainNavigation;
