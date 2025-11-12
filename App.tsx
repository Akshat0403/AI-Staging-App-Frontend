
import React, { useState } from 'react';
import { AppState } from './types';
import { generateStagedImage } from './services/geminiService';
import Header from './components/Header';
import ImageInput from './components/ImageInput';
import StagingScreen from './components/StagingScreen';
import ResultScreen from './components/ResultScreen';
import Loader from './components/Loader';

const App: React.FC = () => {
  const [appState, setAppState] = useState<AppState>(AppState.IDLE);
  const [originalImageFile, setOriginalImageFile] = useState<File | null>(null);
  const [generatedImageUrl, setGeneratedImageUrl] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleImageSelect = (file: File) => {
    setOriginalImageFile(file);
    setAppState(AppState.IMAGE_SELECTED);
    setErrorMessage(null);
  };

  const handleGenerate = async (prompt: string) => {
    if (!originalImageFile) return;
    setAppState(AppState.GENERATING);
    setErrorMessage(null);
    try {
      const result = await generateStagedImage(originalImageFile, prompt);
      setGeneratedImageUrl(result);
      setAppState(AppState.RESULT_READY);
    } catch (error) {
      const message = error instanceof Error ? error.message : 'An unknown error occurred.';
      setErrorMessage(message);
      setAppState(AppState.ERROR);
    }
  };

  const handleReset = () => {
    setAppState(AppState.IDLE);
    setOriginalImageFile(null);
    setGeneratedImageUrl(null);
    setErrorMessage(null);
  };

  const renderContent = () => {
    switch (appState) {
      case AppState.IDLE:
        return <ImageInput onImageSelect={handleImageSelect} />;
      case AppState.IMAGE_SELECTED:
      case AppState.ERROR:
        return (
          <StagingScreen
            imageFile={originalImageFile!}
            onGenerate={handleGenerate}
            onReset={handleReset}
            error={errorMessage}
          />
        );
      case AppState.GENERATING:
        return <Loader />;
      case AppState.RESULT_READY:
        return (
          <ResultScreen
            originalImage={URL.createObjectURL(originalImageFile!)}
            generatedImage={generatedImageUrl!}
            onReset={handleReset}
          />
        );
      default:
        return <ImageInput onImageSelect={handleImageSelect} />;
    }
  };

  return (
    <div className="bg-gray-900 text-white min-h-screen font-sans">
      <Header />
      <main className="container mx-auto p-4 max-w-7xl">
        <div className="min-h-[calc(100vh-100px)] flex flex-col items-center justify-center">
            {renderContent()}
        </div>
      </main>
    </div>
  );
};

export default App;
