
import React, { useState, useEffect } from 'react';
import { DESIGN_STYLES } from '../constants';
import { DesignStyle } from '../types';
import { SparklesIcon } from './icons/SparklesIcon';
import { ResetIcon } from './icons/ResetIcon';

interface StagingScreenProps {
  imageFile: File;
  onGenerate: (prompt: string) => void;
  onReset: () => void;
  error: string | null;
}

const StagingScreen: React.FC<StagingScreenProps> = ({ imageFile, onGenerate, onReset, error }) => {
  const [selectedStyle, setSelectedStyle] = useState<DesignStyle | null>(null);
  const [customPrompt, setCustomPrompt] = useState('');
  const [imageUrl, setImageUrl] = useState<string | null>(null);

  useEffect(() => {
    const objectUrl = URL.createObjectURL(imageFile);
    setImageUrl(objectUrl);
    return () => URL.revokeObjectURL(objectUrl);
  }, [imageFile]);

  const handleGenerateClick = () => {
    if (customPrompt.trim()) {
      onGenerate(customPrompt.trim());
    } else if (selectedStyle) {
      onGenerate(selectedStyle.prompt);
    }
  };

  const isGenerateDisabled = !selectedStyle && !customPrompt.trim();

  return (
    <div className="w-full flex flex-col lg:flex-row gap-8 items-start">
      <div className="w-full lg:w-1/2 flex-shrink-0">
        <div className="sticky top-8">
            <h2 className="text-xl font-semibold mb-4 text-gray-300">Your Room</h2>
            {imageUrl && (
                <img
                src={imageUrl}
                alt="Uploaded room"
                className="rounded-lg shadow-lg w-full object-contain max-h-[60vh]"
                />
            )}
            <button
                onClick={onReset}
                className="mt-4 flex items-center justify-center gap-2 text-sm text-gray-400 hover:text-white transition-colors"
                >
                <ResetIcon className="w-4 h-4" />
                Use a different photo
            </button>
        </div>
      </div>
      
      <div className="w-full lg:w-1/2 bg-gray-800/50 p-6 rounded-2xl border border-gray-700">
        <h2 className="text-2xl font-bold mb-4">Choose a Design Style</h2>
        
        {error && (
            <div className="bg-red-900/50 border border-red-700 text-red-300 p-3 rounded-md mb-4 text-sm">
                <p className="font-semibold">Generation Failed</p>
                <p>{error}</p>
            </div>
        )}

        <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 mb-6">
          {DESIGN_STYLES.map((style) => (
            <button
              key={style.name}
              onClick={() => {
                setSelectedStyle(style);
                setCustomPrompt('');
              }}
              className={`p-2 rounded-lg transition-all duration-200 focus:outline-none ${
                selectedStyle?.name === style.name ? 'ring-2 ring-indigo-500 scale-105' : 'hover:scale-105'
              }`}
            >
              <img src={style.imageUrl} alt={style.name} className="w-full h-20 object-cover rounded-md" />
              <p className={`mt-2 text-sm font-medium ${selectedStyle?.name === style.name ? 'text-indigo-400' : 'text-gray-300'}`}>{style.name}</p>
            </button>
          ))}
        </div>

        <div className="flex items-center my-6">
            <div className="flex-grow border-t border-gray-600"></div>
            <span className="flex-shrink mx-4 text-gray-400 text-sm">OR</span>
            <div className="flex-grow border-t border-gray-600"></div>
        </div>

        <div>
            <label htmlFor="custom-prompt" className="block text-sm font-medium text-gray-300 mb-2">
            Use a Custom Prompt
            </label>
            <textarea
                id="custom-prompt"
                rows={3}
                value={customPrompt}
                onChange={(e) => {
                    setCustomPrompt(e.target.value);
                    setSelectedStyle(null);
                }}
                placeholder="e.g., A cozy reading nook with a leather armchair and a view of a snowy forest..."
                className="w-full p-2 bg-gray-700 border border-gray-600 rounded-md focus:ring-indigo-500 focus:border-indigo-500 transition"
            ></textarea>
        </div>

        <button
          onClick={handleGenerateClick}
          disabled={isGenerateDisabled}
          className="w-full mt-6 flex items-center justify-center gap-2 bg-indigo-600 text-white font-bold py-3 px-4 rounded-lg transition-colors duration-300 hover:bg-indigo-500 disabled:bg-gray-600 disabled:cursor-not-allowed"
        >
          <SparklesIcon className="w-5 h-5" />
          Generate Design
        </button>
      </div>
    </div>
  );
};

export default StagingScreen;
