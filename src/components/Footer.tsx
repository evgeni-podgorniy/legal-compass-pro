
import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="border-t py-6 md:py-10">
      <div className="container flex flex-col items-center justify-between gap-4 md:flex-row">
        <div className="text-center md:text-left">
          <p className="text-sm text-muted-foreground">
            &copy; {new Date().getFullYear()} Правовой Компас. Все права защищены.
          </p>
        </div>
        
        <nav className="flex gap-4 sm:gap-6">
          <Link to="/about" className="text-sm text-muted-foreground hover:underline">
            О нас
          </Link>
          <Link to="/terms" className="text-sm text-muted-foreground hover:underline">
            Условия использования
          </Link>
          <Link to="/privacy" className="text-sm text-muted-foreground hover:underline">
            Конфиденциальность
          </Link>
        </nav>
      </div>
    </footer>
  );
};

export default Footer;
