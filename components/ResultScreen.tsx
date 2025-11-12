import React, { useState, useRef, useEffect } from 'react';
import { DownloadIcon } from './icons/DownloadIcon';
import { ResetIcon } from './icons/ResetIcon';

interface ResultScreenProps {
  originalImage: string;
  generatedImage: string;
  onReset: () => void;
}

const ResultScreen: React.FC<ResultScreenProps> = ({ originalImage, generatedImage, onReset }) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleDownload = (quality: 'high' | 'standard') => {
    if (quality === 'high') {
      const link = document.createElement('a');
      link.href = generatedImage;
      link.download = 'ai-staged-room-high.png';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } else {
      const img = new Image();
      img.onload = () => {
        const canvas = document.createElement('canvas');
        canvas.width = img.width;
        canvas.height = img.height;
        const ctx = canvas.getContext('2d');
        if (ctx) {
          ctx.fillStyle = 'white';
          ctx.fillRect(0, 0, canvas.width, canvas.height);
          ctx.drawImage(img, 0, 0);
          const dataUrl = canvas.toDataURL('image/jpeg', 0.7);
          const link = document.createElement('a');
          link.href = dataUrl;
          link.download = 'ai-staged-room-standard.jpeg';
          document.body.appendChild(link);
          link.click();
          document.body.removeChild(link);
        }
      };
      img.crossOrigin = 'anonymous';
      img.src = generatedImage;
    }
    setIsDropdownOpen(false);
  };
    
  return (
    <div className="w-full text-center">
      <h2 className="text-3xl font-bold mb-6 text-white">Your Room, Reimagined</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-8 mb-8">
        <div className="bg-gray-800/50 p-4 rounded-xl border border-gray-700">
          <h3 className="text-lg font-semibold mb-3 text-gray-400">Original</h3>
          <img src={originalImage} alt="Original room" className="rounded-lg w-full h-auto aspect-square object-cover" />
        </div>
        <div className="bg-gray-800/50 p-4 rounded-xl border border-gray-700">
          <h3 className="text-lg font-semibold mb-3 text-indigo-400">AI Staged</h3>
          <img src={generatedImage} alt="AI staged room" className="rounded-lg w-full h-auto aspect-square object-cover" />
        </div>
      </div>

      <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
        <div className="relative inline-block text-left" ref={dropdownRef}>
            <div>
                <button
                type="button"
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                className="w-full sm:w-auto flex items-center justify-center gap-2 bg-indigo-600 text-white font-bold py-3 px-6 rounded-lg transition-colors duration-300 hover:bg-indigo-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-900 focus:ring-indigo-500"
                id="menu-button"
                aria-expanded={isDropdownOpen}
                aria-haspopup="true"
                >
                <DownloadIcon className="w-5 h-5" />
                Download
                <svg className="-mr-1 ml-2 h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                    <path fillRule="evenodd" d="M5.23 7.21a.75.75 0 011.06.02L10 10.94l3.71-3.71a.75.75 0 111.06 1.06l-4.25 4.25a.75.75 0 01-1.06 0L5.23 8.27a.75.75 0 010-1.06z" clipRule="evenodd" />
                </svg>
                </button>
            </div>

            {isDropdownOpen && (
                <div
                className="origin-top-right absolute right-0 mt-2 w-56 rounded-md shadow-lg bg-gray-700 ring-1 ring-black ring-opacity-5 focus:outline-none z-10"
                role="menu"
                aria-orientation="vertical"
                aria-labelledby="menu-button"
                >
                <div className="py-1" role="none">
                    <button
                        onClick={() => handleDownload('high')}
                        className="w-full text-left text-gray-200 block px-4 py-2 text-sm hover:bg-gray-600"
                        role="menuitem"
                    >
                        High Quality (.png)
                    </button>
                    <button
                        onClick={() => handleDownload('standard')}
                        className="w-full text-left text-gray-200 block px-4 py-2 text-sm hover:bg-gray-600"
                        role="menuitem"
                    >
                        Standard Quality (.jpeg)
                    </button>
                </div>
                </div>
            )}
        </div>

        <button
          onClick={onReset}
          className="w-full sm:w-auto flex items-center justify-center gap-2 bg-gray-700 text-white font-bold py-3 px-6 rounded-lg transition-colors duration-300 hover:bg-gray-600"
        >
          <ResetIcon className="w-5 h-5" />
          Start Over
        </button>
      </div>
    </div>
  );
};

export default ResultScreen;
