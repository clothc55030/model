import React, { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { UploadSection } from './components/UploadSection';
import { OptionsSection } from './components/OptionsSection';
import { ResultSection } from './components/ResultSection';
import { Ethnicity, Scene, Vibe } from './types';
import { generateTryOnImage } from './services/geminiService';

const App: React.FC = () => {
  const [hasKey, setHasKey] = useState<boolean>(false);
  const [clothingImageBase64, setClothingImageBase64] = useState<string | null>(null);
  const [ethnicity, setEthnicity] = useState<Ethnicity>(Ethnicity.ASIAN);
  const [vibe, setVibe] = useState<Vibe>(Vibe.COOL);
  const [scene, setScene] = useState<Scene>(Scene.STUDIO);
  
  const [generatedImage, setGeneratedImage] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const checkApiKey = async () => {
      // Safely check for aistudio environment
      if (typeof window !== 'undefined' && window.aistudio) {
        try {
          const hasSelected = await window.aistudio.hasSelectedApiKey();
          setHasKey(hasSelected);
        } catch (e) {
          console.warn("AI Studio check failed", e);
        }
      } else {
        // Fallback for environments without aistudio
        // Safely check process.env to avoid ReferenceError
        const hasEnvKey = typeof process !== 'undefined' && process.env && process.env.API_KEY;
        if (hasEnvKey) {
            setHasKey(true);
        }
      }
    };
    checkApiKey();
  }, []);

  const handleLogin = async () => {
    if (typeof window !== 'undefined' && window.aistudio) {
      try {
        await window.aistudio.openSelectKey();
        setHasKey(true);
      } catch (e) {
        console.error("Login failed", e);
      }
    } else {
      alert("此功能依賴 Google AI Studio 環境。若您已將此專案部署至 GitHub Pages，請確保在建置設定中已配置 API Key (process.env.API_KEY)。");
    }
  };

  const handleImageSelected = (base64: string, previewUrl: string) => {
    setClothingImageBase64(base64);
    // Reset previous generation when new image is uploaded
    setGeneratedImage(null);
    setError(null);
  };

  const handleGenerate = async () => {
    if (!clothingImageBase64) {
      setError("請先上傳衣物照片");
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      const resultImageUrl = await generateTryOnImage(clothingImageBase64, ethnicity, vibe, scene);
      setGeneratedImage(resultImageUrl);
    } catch (err: any) {
      // Handle missing entity error by prompting for key again
      if (err.message && err.message.includes("Requested entity was not found")) {
        if (typeof window !== 'undefined' && window.aistudio) {
          try {
            await window.aistudio.openSelectKey();
            // Clear error so user can try again easily
            setError(null);
          } catch (selectErr) {
            // User might have cancelled
          }
        }
        setIsLoading(false);
        return;
      }
      setError(err.message || "生成過程中發生錯誤，請稍後再試。");
    } finally {
      setIsLoading(false);
    }
  };

  if (!hasKey) {
    return (
      <div className="min-h-screen bg-slate-50 flex flex-col items-center justify-center p-4">
        <div className="bg-white p-8 rounded-2xl shadow-xl max-w-md w-full text-center border border-slate-100">
          <div className="w-16 h-16 bg-indigo-50 text-indigo-600 rounded-full flex items-center justify-center mx-auto mb-6">
            <span className="text-3xl">✨</span>
          </div>
          <h1 className="text-2xl font-bold text-slate-900 mb-2">歡迎使用 AI 虛擬試衣間</h1>
          <p className="text-slate-600 mb-8">
            請連結您的 Google 帳號以使用 Gemini API 額度進行生成。
          </p>
          <button
            onClick={handleLogin}
            className="w-full py-3 px-4 bg-gradient-to-r from-primary to-secondary text-white rounded-xl font-medium shadow-lg hover:opacity-90 transition-all flex items-center justify-center gap-2"
          >
            <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
               <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#FFFFFF"/>
               <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#FFFFFF"/>
               <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FFFFFF"/>
               <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#FFFFFF"/>
            </svg>
            連結 Google 帳號
          </button>
          <p className="mt-6 text-xs text-slate-400">
            請選擇付費的 Google Cloud 專案以確保服務正常運行。
            <a href="https://ai.google.dev/gemini-api/docs/billing" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline ml-1">
              查看計費說明
            </a>
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 pb-20">
      <Header />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* Left Column: Inputs */}
          <div className="lg:col-span-5 space-y-8">
            <UploadSection onImageSelected={handleImageSelected} />
            
            <OptionsSection 
              selectedEthnicity={ethnicity}
              setSelectedEthnicity={setEthnicity}
              selectedVibe={vibe}
              setSelectedVibe={setVibe}
              selectedScene={scene}
              setSelectedScene={setScene}
            />

            <button
              onClick={handleGenerate}
              disabled={isLoading || !clothingImageBase64}
              className={`
                w-full py-4 rounded-xl font-bold text-lg shadow-lg shadow-indigo-200
                flex items-center justify-center gap-2 transition-all transform active:scale-95
                ${isLoading || !clothingImageBase64 
                  ? 'bg-slate-300 text-slate-500 cursor-not-allowed shadow-none' 
                  : 'bg-gradient-to-r from-primary to-secondary text-white hover:opacity-90'}
              `}
            >
              {isLoading ? (
                <>
                  <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  生成中...
                </>
              ) : (
                <>
                  <span>✨</span>
                  <span>開始生成模特穿搭</span>
                </>
              )}
            </button>
          </div>

          {/* Right Column: Result */}
          <div className="lg:col-span-7">
            <div className="bg-white p-6 rounded-3xl shadow-sm border border-slate-200 h-full">
              <h2 className="text-xl font-bold text-slate-800 mb-6 flex items-center gap-2">
                <span className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center text-lg">📸</span>
                預覽結果
              </h2>
              <ResultSection 
                isLoading={isLoading} 
                generatedImage={generatedImage} 
                error={error} 
              />
            </div>
          </div>

        </div>
      </main>
    </div>
  );
};

export default App;