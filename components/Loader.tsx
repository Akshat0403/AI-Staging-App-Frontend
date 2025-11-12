
import React, { useState, useEffect } from 'react';
import { SparklesIcon } from './icons/SparklesIcon';

const loadingMessages = [
    "Staging your room...",
    "Arranging the furniture...",
    "Adding designer touches...",
    "Perfecting the lighting...",
    "Finalizing your new space...",
];

const Loader: React.FC = () => {
    const [messageIndex, setMessageIndex] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setMessageIndex((prevIndex) => (prevIndex + 1) % loadingMessages.length);
        }, 3000);

        return () => clearInterval(interval);
    }, []);

  return (
    <div className="flex flex-col items-center justify-center text-center p-8">
      <SparklesIcon className="w-16 h-16 text-indigo-400 animate-pulse mb-6" />
      <h2 className="text-2xl font-bold text-white mb-2">Generating Your Design</h2>
      <p className="text-gray-400 transition-opacity duration-500">{loadingMessages[messageIndex]}</p>
    </div>
  );
};

export default Loader;
