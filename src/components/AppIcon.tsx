
import React from 'react';
import { Scale } from 'lucide-react';

interface AppIconProps {
  size?: number;
  className?: string;
}

const AppIcon: React.FC<AppIconProps> = ({ size = 40, className = '' }) => {
  return (
    <div 
      className={`relative rounded-xl overflow-hidden flex items-center justify-center bg-gradient-to-br from-legal-primary to-blue-800 ${className}`}
      style={{ width: size, height: size }}
    >
      <div className="absolute inset-0 flex items-center justify-center">
        <Scale 
          className="text-white z-10" 
          size={size * 0.7} 
          strokeWidth={2.5}
        />
      </div>
      <div className="absolute inset-0 bg-gradient-to-tl from-blue-600/30 to-transparent pointer-events-none" />
    </div>
  );
};

export default AppIcon;
