
import React from 'react';
import { LogOut } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';
import { useToast } from '@/components/ui/use-toast';

interface LogoutButtonProps {
  variant?: 'default' | 'destructive' | 'outline' | 'secondary' | 'ghost' | 'link';
  size?: 'default' | 'sm' | 'lg' | 'icon';
  className?: string;
}

const LogoutButton: React.FC<LogoutButtonProps> = ({ 
  variant = 'ghost', 
  size = 'default',
  className = ''
}) => {
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const handleLogout = () => {
    // Имитация процесса выхода
    toast({
      title: "Выход выполнен",
      description: "Вы успешно вышли из системы",
    });
    
    // Перенаправление на главную
    navigate('/');
  };
  
  return (
    <Button 
      variant={variant} 
      size={size} 
      onClick={handleLogout}
      className={className}
    >
      <LogOut className="h-4 w-4 mr-2" />
      <span>Выйти</span>
    </Button>
  );
};

export default LogoutButton;
