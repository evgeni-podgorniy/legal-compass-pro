
import React from 'react';
import { Gavel, Scale, Shield } from 'lucide-react';

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
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-1/4 left-1/4 transform -translate-x-1/2 -translate-y-1/2">
          <Gavel className="text-white" size={size * 0.6} />
        </div>
        <div className="absolute bottom-1/4 right-1/4 transform translate-x-1/2 translate-y-1/2">
          <Scale className="text-white" size={size * 0.6} />
        </div>
      </div>
      <Shield className="text-white z-10" size={size * 0.5} />
      <div className="absolute inset-0 bg-gradient-to-tl from-blue-600/30 to-transparent pointer-events-none" />
    </div>
  );
};

export default AppIcon;
