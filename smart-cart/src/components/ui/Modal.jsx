import React from 'react';
import { X } from 'lucide-react';

const Modal = ({ isOpen, onClose, children }) => {
  if (!isOpen) return null;
  
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 animate-fadeIn">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        onClick={onClose}
      />
      
      {/* Modal Content */}
      <div className="relative bg-white rounded-3xl shadow-2xl max-w-md w-full max-h-[90vh] overflow-hidden animate-slideUp">
        {/* Header */}
        <div className="sticky top-0 bg-gradient-to-r from-blue-600 to-blue-700 px-6 py-5 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-white/20 rounded-lg flex items-center justify-center">
              🛒
            </div>
            <h2 className="text-xl font-bold text-white">SmartCart</h2>
          </div>
          <button 
            onClick={onClose} 
            className="text-white/80 hover:text-white transition-colors hover:rotate-90 transform duration-200"
          >
            <X size={24} />
          </button>
        </div>
        
        {/* Body */}
        <div className="p-6 overflow-y-auto max-h-[calc(90vh-80px)]">
          {children}
        </div>
      </div>
    </div>
  );
};

export default Modal;