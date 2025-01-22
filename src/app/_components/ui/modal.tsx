// app/_components/ui/Modal.tsx
import React from 'react';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
  title?: string;
}

export const Modal: React.FC<ModalProps> = ({ isOpen, onClose, children, title }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Overlay */}
      <div 
        className="fixed inset-0 bg-black bg-opacity-50 transition-opacity"
        onClick={onClose}
      />
      
      {/* Modal Content */}
      <div className="relative z-50 w-full max-w-md rounded-lg bg-white p-6 shadow-xl">
        {title && (
          <div className="mb-4 text-xl font-semibold">
            {title}
          </div>
        )}
        
        {children}
      </div>
    </div>
  );
};

export default Modal;