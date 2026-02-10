import { Icon } from '@iconify/react';
import { useEffect } from 'react';

interface ComingSoonDialogProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function ComingSoonDialog({ isOpen, onClose }: ComingSoonDialogProps) {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div 
      className="fixed inset-0 z-[9999] flex items-center justify-center p-4 bg-black/90 backdrop-blur-md animate-in fade-in duration-300"
      onClick={onClose}
    >
      <div 
        className="relative bg-[#0a0a0a] border-2 border-blue-500/50 rounded-2xl p-10 max-w-md w-full animate-in zoom-in-95 duration-300 shadow-2xl shadow-blue-500/20"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Glow effect behind dialog */}
        <div className="absolute inset-0 bg-blue-500/10 rounded-2xl blur-2xl -z-10"></div>
        
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-white transition-all duration-200 hover:scale-110 group"
        >
          <Icon icon="solar:close-circle-bold" className="w-7 h-7 group-hover:rotate-90 transition-transform duration-300" />
        </button>
        
        <div className="text-center">
          {/* Icon container with animation */}
          <div className="relative w-24 h-24 mx-auto mb-6">
            {/* Glow effect */}
            <div className="absolute inset-0 bg-blue-500/30 rounded-2xl blur-xl animate-pulse"></div>
            
            {/* Icon container */}
            <div className="relative w-full h-full bg-gradient-to-br from-blue-500/20 via-blue-600/20 to-blue-500/20 border-2 border-blue-500/50 rounded-2xl flex items-center justify-center backdrop-blur-sm">
              <Icon 
                icon="solar:clock-circle-bold-duotone" 
                className="w-12 h-12 text-blue-400 animate-pulse" 
              />
            </div>
            
            {/* Sparkle effects */}
            <div className="absolute -top-1 -right-1 w-3 h-3 bg-blue-400 rounded-full animate-ping"></div>
            <div className="absolute -bottom-1 -left-1 w-2 h-2 bg-blue-500 rounded-full animate-ping delay-300"></div>
          </div>
          
          {/* Title */}
          <h3 className="text-3xl font-black text-white mb-3 bg-gradient-to-r from-white to-blue-200 bg-clip-text text-transparent">
            Próximamente
          </h3>
          
          {/* Description */}
          <p className="text-gray-300 text-base leading-relaxed mb-6">
            Esta plataforma estará disponible muy pronto. Mantente al tanto de nuestras actualizaciones.
          </p>
          
          {/* Decorative line */}
          <div className="flex items-center justify-center gap-2 mb-4">
            <div className="h-px w-12 bg-gradient-to-r from-transparent to-blue-500/50"></div>
            <div className="w-1.5 h-1.5 bg-blue-500 rounded-full"></div>
            <div className="h-px w-12 bg-gradient-to-l from-transparent to-blue-500/50"></div>
          </div>
        </div>
      </div>
    </div>
  );
}
