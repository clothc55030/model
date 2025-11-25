import React from 'react';

interface ResultSectionProps {
  isLoading: boolean;
  generatedImage: string | null;
  error: string | null;
}

export const ResultSection: React.FC<ResultSectionProps> = ({ isLoading, generatedImage, error }) => {
  if (error) {
    return (
      <div className="w-full h-full min-h-[300px] flex items-center justify-center bg-red-50 rounded-2xl border border-red-100 p-6 text-center">
        <div className="text-red-500">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-12 h-12 mx-auto mb-2">
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m9-.75a9 9 0 11-18 0 9 9 0 0118 0zm-9 3.75h.008v.008H12v-.008z" />
          </svg>
          <p className="font-medium">生成失敗</p>
          <p className="text-sm mt-1 opacity-80">{error}</p>
        </div>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="w-full h-full min-h-[400px] flex flex-col items-center justify-center bg-slate-50 rounded-2xl border border-slate-200 relative overflow-hidden">
        {/* Animated background pulse */}
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent w-full -translate-x-full animate-[shimmer_1.5s_infinite]"></div>
        
        <div className="relative z-10 flex flex-col items-center">
          <div className="w-16 h-16 border-4 border-primary/30 border-t-primary rounded-full animate-spin mb-4"></div>
          <p className="text-slate-600 font-medium animate-pulse">正在為您量身打造...</p>
          <p className="text-slate-400 text-xs mt-2">這可能需要幾秒鐘</p>
        </div>
      </div>
    );
  }

  if (!generatedImage) {
    return (
      <div className="w-full h-full min-h-[400px] flex flex-col items-center justify-center bg-slate-100 rounded-2xl border border-slate-200 text-slate-400">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-16 h-16 mb-2 opacity-50">
            <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09zM18.259 8.715L18 9.75l-.259-1.035a3.375 3.375 0 00-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 002.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 002.456 2.456L21.75 6l-1.035.259a3.375 3.375 0 00-2.456 2.456zM16.894 20.567L16.5 21.75l-.394-1.183a2.25 2.25 0 00-1.423-1.423L13.5 18.75l1.183-.394a2.25 2.25 0 001.423-1.423l.394-1.183.394 1.183a2.25 2.25 0 001.423 1.423l1.183.394-1.183.394a2.25 2.25 0 00-1.423 1.423z" />
        </svg>
        <p>生成的照片將顯示於此</p>
      </div>
    );
  }

  return (
    <div className="w-full relative group">
      <div className="rounded-2xl overflow-hidden shadow-lg border border-slate-200">
        <img 
          src={generatedImage} 
          alt="Generated Model" 
          className="w-full h-auto object-cover"
        />
      </div>
      <div className="mt-4 flex justify-center">
        <a 
          href={generatedImage} 
          download="model-try-on.png"
          className="flex items-center gap-2 px-6 py-2 bg-slate-900 text-white rounded-full font-medium hover:bg-slate-800 transition-colors shadow-lg"
        >
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4">
            <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5M12 12.75l7.5-7.5 7.5 7.5M12 3v9" />
          </svg>
          下載圖片
        </a>
      </div>
    </div>
  );
};
