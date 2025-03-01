import { useState } from 'react';


const ImageModal = ({ isOpen, onClose, imageUrl }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4" onClick={onClose}>
      <div className="relative max-w-4xl max-h-[90vh] w-full">
        <button 
          className="absolute -top-10 right-0 text-white text-xl font-bold p-2"
          onClick={onClose}
        >
          ✕
        </button>
        <img 
          src={imageUrl} 
          alt="Payment Screenshot" 
          className="w-full h-full object-contain"
          onClick={(e) => e.stopPropagation()}
        />
      </div>
    </div>
  );
};

export default ImageModal