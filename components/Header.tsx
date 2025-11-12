
import React from 'react';
import { SparklesIcon } from './icons/SparklesIcon';

const Header: React.FC = () => {
  return (
    <header className="py-4 border-b border-gray-700">
      <div className="container mx-auto px-4 flex items-center justify-center">
        <SparklesIcon className="w-8 h-8 text-indigo-400 mr-3" />
        <h1 className="text-2xl font-bold text-white tracking-tight">
          AI Interior Staging
        </h1>
      </div>
    </header>
  );
};

export default Header;
