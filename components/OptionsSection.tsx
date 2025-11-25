import React from 'react';
import { Ethnicity, Vibe, Scene } from '../types';

interface OptionsSectionProps {
  selectedEthnicity: Ethnicity;
  setSelectedEthnicity: (e: Ethnicity) => void;
  selectedVibe: Vibe;
  setSelectedVibe: (v: Vibe) => void;
  selectedScene: Scene;
  setSelectedScene: (s: Scene) => void;
}

export const OptionsSection: React.FC<OptionsSectionProps> = ({
  selectedEthnicity,
  setSelectedEthnicity,
  selectedVibe,
  setSelectedVibe,
  selectedScene,
  setSelectedScene,
}) => {
  
  const renderOptionGroup = <T extends string>(
    title: string, 
    step: string,
    options: Record<string, T>, 
    currentValue: T, 
    onChange: (val: T) => void
  ) => {
    return (
      <div className="mb-6">
         <h2 className="text-lg font-semibold text-slate-800 mb-3 flex items-center gap-2">
            <span className="flex items-center justify-center w-6 h-6 rounded-full bg-primary text-white text-xs">{step}</span>
            {title}
          </h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
          {Object.values(options).map((option) => (
            <button
              key={option}
              onClick={() => onChange(option)}
              className={`
                px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200 border
                ${currentValue === option 
                  ? 'bg-primary text-white border-primary shadow-md shadow-indigo-200' 
                  : 'bg-white text-slate-600 border-slate-200 hover:border-primary/30 hover:bg-slate-50'}
              `}
            >
              {option}
            </button>
          ))}
        </div>
      </div>
    );
  };

  return (
    <div className="w-full bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
      {renderOptionGroup('選擇模特人種', '2', Ethnicity, selectedEthnicity, setSelectedEthnicity)}
      {renderOptionGroup('選擇個性風格', '3', Vibe, selectedVibe, setSelectedVibe)}
      {renderOptionGroup('選擇拍攝場景', '4', Scene, selectedScene, setSelectedScene)}
    </div>
  );
};
