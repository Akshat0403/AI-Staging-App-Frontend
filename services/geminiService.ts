
import { GoogleGenAI, Modality } from '@google/genai';

const fileToBase64 = (file: File): Promise<{ base64: string; mimeType: string }> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      if (typeof reader.result !== 'string') {
        return reject(new Error('FileReader did not return a string.'));
      }
      const result = reader.result as string;
      const base64 = result.split(',')[1];
      resolve({ base64, mimeType: file.type });
    };
    reader.onerror = (error) => reject(error);
  });
};

const getApiKey = (): string => {
    const apiKey = process.env.API_KEY;
    if (!apiKey) {
        throw new Error('API_KEY environment variable not set.');
    }
    return apiKey;
};

export const generateStagedImage = async (imageFile: File, prompt: string): Promise<string> => {
  try {
    const ai = new GoogleGenAI({ apiKey: getApiKey() });
    const { base64, mimeType } = await fileToBase64(imageFile);

    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash-image',
      contents: {
        parts: [
          {
            inlineData: {
              data: base64,
              mimeType: mimeType,
            },
          },
          {
            text: `Given this image of a room, ${prompt}`,
          },
        ],
      },
      config: {
        responseModalities: [Modality.IMAGE],
      },
    });

    for (const part of response.candidates[0].content.parts) {
      if (part.inlineData) {
        const base64ImageBytes: string = part.inlineData.data;
        return `data:${part.inlineData.mimeType};base64,${base64ImageBytes}`;
      }
    }
    
    throw new Error('No image data found in the API response.');

  } catch (error) {
    console.error('Error generating staged image:', error);
    if (error instanceof Error && error.message.includes('API_KEY')) {
        throw new Error('API Key is not configured correctly. Please check your environment variables.');
    }
    throw new Error('Failed to generate image. The AI may not have been able to process this request. Please try again.');
  }
};
