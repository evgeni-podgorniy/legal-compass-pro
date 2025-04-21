
import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Scale, MessageSquare, FileText, FileScan, Home, User, LogOut } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import LogoutButton from './LogoutButton';
import { useToast } from '@/components/ui/use-toast';
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu';

const MainNavigation = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [hasScrolled, setHasScrolled] = useState(false);
  const location = useLocation();
  const { toast } = useToast();

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  const closeMenu = () => setIsMenuOpen(false);

  // Обработка прокрутки страницы для изменения стиля навигации
  useEffect(() => {
    const handleScroll = () => {
      setHasScrolled(window.scrollY > 10);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Закрытие мобильного меню при изменении маршрута
  useEffect(() => {
    closeMenu();
  }, [location.pathname]);

  const isActive = (path: string) => {
    return location.pathname === path;
  };

  return (
    <header className={cn(
      "sticky top-0 z-50 w-full transition-all duration-300",
      hasScrolled 
        ? "border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60" 
        : "bg-transparent"
    )}>
      <div className="container flex h-16 items-center justify-between">
        <div className="flex items-center">
          <Link to="/" className="flex items-center space-x-2" onClick={closeMenu}>
            <Scale className="h-6 w-6 text-legal-primary" />
            <span className="font-bold text-xl hidden md:inline-block">Правовой Компас</span>
          </Link>
        </div>

        {/* Desktop navigation */}
        <nav className="hidden md:flex items-center space-x-1 lg:space-x-2">
          <Link
            to="/"
            className={cn(
              "px-3 py-2 text-sm font-medium rounded-md transition-colors",
              isActive('/') 
                ? "bg-secondary text-primary" 
                : "hover:bg-secondary/50"
            )}
          >
            Главная
          </Link>
          <Link
            to="/chat"
            className={cn(
              "px-3 py-2 text-sm font-medium rounded-md transition-colors",
              isActive('/chat') 
                ? "bg-secondary text-primary" 
                : "hover:bg-secondary/50"
            )}
          >
            Консультация
          </Link>
          <Link
            to="/documents"
            className={cn(
              "px-3 py-2 text-sm font-medium rounded-md transition-colors",
              isActive('/documents') 
                ? "bg-secondary text-primary" 
                : "hover:bg-secondary/50"
            )}
          >
            Документы
          </Link>
          <Link
            to="/analysis"
            className={cn(
              "px-3 py-2 text-sm font-medium rounded-md transition-colors",
              isActive('/analysis') 
                ? "bg-secondary text-primary" 
                : "hover:bg-secondary/50"
            )}
          >
            Анализ договоров
          </Link>
          <Link
            to="/premium"
            className={cn(
              "px-3 py-2 text-sm font-medium rounded-md transition-colors",
              isActive('/premium') 
                ? "bg-secondary text-primary" 
                : "hover:bg-secondary/50"
            )}
          >
            Премиум
          </Link>
        </nav>

        {/* User menu (desktop) */}
        <div className="hidden md:flex items-center space-x-2">
          <Button variant="outline" size="sm" onClick={() => {
            toast({
              title: "Режим темы",
              description: "Функция переключения темы будет доступна в ближайшем обновлении"
            });
          }}>
            Тема
          </Button>
          
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="rounded-full">
                <User className="h-5 w-5" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>Мой аккаунт</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem>
                <User className="mr-2 h-4 w-4" />
                <span>Профиль</span>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link to="/premium">
                  <Scale className="mr-2 h-4 w-4" />
                  <span>Подписка</span>
                </Link>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem>
                <LogOut className="mr-2 h-4 w-4" />
                <span>Выйти</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        {/* Mobile menu button */}
        <Button
          variant="ghost"
          className="md:hidden"
          onClick={toggleMenu}
          aria-label={isMenuOpen ? "Закрыть меню" : "Открыть меню"}
        >
          {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </Button>

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
            <Link
              to="/premium"
              className="flex items-center space-x-2 text-sm font-medium"
              onClick={closeMenu}
            >
              <Scale className="h-5 w-5" />
              <span>Премиум</span>
            </Link>
            <div className="border-t pt-4 mt-2">
              <LogoutButton variant="outline" className="w-full justify-center" />
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default MainNavigation;
