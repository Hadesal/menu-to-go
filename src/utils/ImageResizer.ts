type ImageDimensions = { width: number; height: number };

/**
 * Resizes an image file to the specified maxWidth and maxHeight, maintaining aspect ratio.
 * @param file - The image file to resize
 * @param maxWidth - The maximum width for the resized image
 * @param maxHeight - The maximum height for the resized image
 * @returns A promise that resolves to a Blob containing the resized image
 */
export const resizeImage = (
  file: File,
  maxWidth: number,
  maxHeight: number
): Promise<Blob | null> => {
  return new Promise((resolve, reject) => {
    const img = new Image();
    const objectURL = URL.createObjectURL(file);

    img.src = objectURL;

    img.onload = () => {
      const aspectRatio = img.width / img.height;
      let width = maxWidth;
      let height = maxHeight;

      // Resize based on the aspect ratio
      if (img.width > maxWidth || img.height > maxHeight) {
        if (img.width > img.height) {
          height = width / aspectRatio;
        } else {
          width = height * aspectRatio;
        }
      }

      const canvas = document.createElement("canvas");
      canvas.width = width;
      canvas.height = height;

      const ctx = canvas.getContext("2d");
      if (!ctx) {
        reject(new Error("Failed to get 2D context for canvas"));
        return;
      }

      ctx.drawImage(img, 0, 0, width, height);

      canvas.toBlob(
        (blob) => {
          URL.revokeObjectURL(objectURL); // Revoke the object URL to release memory
          if (blob) {
            resolve(blob);
          } else {
            reject(new Error("Failed to convert canvas to Blob"));
          }
        },
        file.type,
        0.9 // Optional: Set quality to 90% for image compression
      );
    };

    img.onerror = (error) => {
      URL.revokeObjectURL(objectURL); // Ensure URL is revoked in case of error
      reject(new Error(`Image loading error: ${error}`));
    };
  });
};

/**
 * Retrieves the width and height of an image file.
 * @param file - The image file to get dimensions for
 * @returns A promise that resolves to an object containing the width and height
 */
export const getImageDimensions = (file: File): Promise<ImageDimensions> => {
  return new Promise((resolve, reject) => {
    const img = new Image();
    const objectURL = URL.createObjectURL(file);

    img.src = objectURL;

    img.onload = () => {
      URL.revokeObjectURL(objectURL); // Revoke the object URL after loading
      resolve({ width: img.width, height: img.height });
    };

    img.onerror = (error) => {
      URL.revokeObjectURL(objectURL); // Ensure URL is revoked in case of error
      reject(new Error(`Failed to load image: ${error}`));
    };
  });
};

/**
 * Converts a base64 string into a Blob object.
 * @param base64 - The base64 string representing the image
 * @returns A Blob representing the image
 */
export const base64ToBlob = (base64: string): Blob => {
  const [prefix, base64Data] = base64.split(",");
  const mimeTypeMatch = prefix.match(/:(.*?);/);

  if (!mimeTypeMatch) {
    throw new Error("Invalid base64 format");
  }

  const mimeType = mimeTypeMatch[1];
  const byteCharacters = atob(base64Data);
  const byteNumbers = new Array(byteCharacters.length);

  for (let i = 0; i < byteCharacters.length; i++) {
    byteNumbers[i] = byteCharacters.charCodeAt(i);
  }

  const byteArray = new Uint8Array(byteNumbers);
  return new Blob([byteArray], { type: mimeType });
};
