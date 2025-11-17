// Convert image → base64
export const fileToBase64 = (
  file: File
): Promise<{ base64: string; mimeType: string }> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onloadend = () => {
      const base64 = (reader.result as string).split(",")[1];
      resolve({ base64, mimeType: file.type });
    };
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
};

// Call backend API
export const generateStagedImage = async (imageFile: File, prompt: string) => {
  const { base64, mimeType } = await fileToBase64(imageFile);

  const response = await fetch("http://localhost:3001/generate-image", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      base64,
      mimeType,
      prompt,
    }),
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.error || "Failed to generate image");
  }

  return data.image; // base64 image
};
