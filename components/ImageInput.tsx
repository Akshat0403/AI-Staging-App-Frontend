
import React, { useRef } from 'react';
import { UploadIcon } from './icons/UploadIcon';
import { CameraIcon } from './icons/CameraIcon';

interface ImageInputProps {
  onImageSelect: (file: File) => void;
}

const ImageInput: React.FC<ImageInputProps> = ({ onImageSelect }) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const cameraInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      onImageSelect(event.target.files[0]);
    }
  };

  return (
    <div className="w-full max-w-2xl text-center p-8 bg-gray-800/50 rounded-2xl border border-gray-700 shadow-xl">
      <h2 className="text-3xl font-bold mb-2 text-white">Let's Stage Your Room</h2>
      <p className="text-gray-400 mb-8">Upload a photo of an empty room to get started.</p>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <input
          type="file"
          accept="image/*"
          ref={fileInputRef}
          onChange={handleFileChange}
          className="hidden"
        />
        <button
          onClick={() => fileInputRef.current?.click()}
          className="flex flex-col items-center justify-center p-8 bg-indigo-600 text-white rounded-lg hover:bg-indigo-500 transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-900 focus:ring-indigo-500"
        >
          <UploadIcon className="w-12 h-12 mb-2" />
          <span className="font-semibold">Upload Photo</span>
        </button>

        <input
          type="file"
          accept="image/*"
          capture="environment"
          ref={cameraInputRef}
          onChange={handleFileChange}
          className="hidden"
        />
        <button
          onClick={() => cameraInputRef.current?.click()}
          className="flex flex-col items-center justify-center p-8 bg-gray-700 text-white rounded-lg hover:bg-gray-600 transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-900 focus:ring-gray-500"
        >
          <CameraIcon className="w-12 h-12 mb-2" />
          <span className="font-semibold">Take Photo</span>
        </button>
      </div>
      <p className="text-xs text-gray-500 mt-6">For best results, use a clear, well-lit photo of an empty room.</p>
    </div>
  );
};

export default ImageInput;
