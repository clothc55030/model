import React, { useRef, useState } from 'react';

interface UploadSectionProps {
  onImageSelected: (base64: string, previewUrl: string) => void;
}

export const UploadSection: React.FC<UploadSectionProps> = ({ onImageSelected }) => {
  const [preview, setPreview] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      processFile(file);
    }
  };

  const processFile = (file: File) => {
    // Create local preview URL
    const objectUrl = URL.createObjectURL(file);
    setPreview(objectUrl);

    // Convert to Base64 for the API
    const reader = new FileReader();
    reader.onloadend = () => {
      const base64String = reader.result as string;
      const base64Data = base64String.split(',')[1];
      onImageSelected(base64Data, objectUrl);
    };
    reader.readAsDataURL(file);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    const file = e.dataTransfer.files?.[0];
    if (file) {
      processFile(file);
    }
  };

  return (
    <div className="w-full">
      <h2 className="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
        <span className="flex items-center justify-center w-6 h-6 rounded-full bg-primary text-white text-xs">1</span>
        上傳衣物照片
      </h2>
      
      <div 
        className={`relative border-2 border-dashed rounded-2xl transition-all duration-300 overflow-hidden group
          ${preview ? 'border-primary/50 bg-slate-50' : 'border-slate-300 hover:border-primary/50 hover:bg-slate-50'}
          h-64 sm:h-80 flex flex-col items-center justify-center cursor-pointer`}
        onDragOver={handleDragOver}
        onDrop={handleDrop}
        onClick={() => fileInputRef.current?.click()}
      >
        <input 
          type="file" 
          ref={fileInputRef} 
          onChange={handleFileChange} 
          accept="image/*" 
          className="hidden" 
        />
        
        {preview ? (
          <div className="relative w-full h-full p-4">
             <img 
               src={preview} 
               alt="Uploaded clothing" 
               className="w-full h-full object-contain drop-shadow-md"
             />
             <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                <p className="text-white font-medium">點擊或拖曳以更換圖片</p>
             </div>
          </div>
        ) : (
          <div className="text-center p-6">
            <div className="w-16 h-16 bg-indigo-50 text-indigo-500 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8">
                <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5m-13.5-9L12 3m0 0l4.5 4.5M12 3v13.5" />
              </svg>
            </div>
            <p className="text-slate-600 font-medium mb-1">點擊上傳或拖曳圖片至此</p>
            <p className="text-slate-400 text-sm">支援 JPG, PNG</p>
          </div>
        )}
      </div>
    </div>
  );
};
