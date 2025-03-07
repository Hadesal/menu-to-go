// Upload an image and return its view URL
export async function addImage(file: File): Promise<string> {
  try {
    const formData = new FormData();
    formData.append("myImage", file);

    const response = await fetch("https://menutogo.at/upload.php", {
      method: "POST",
      body: formData,
    });

    if (!response.ok) {
      throw new Error("Upload failed.");
    }

    const data = await response.json();

    if (!data.viewUrl) {
      throw new Error("No view URL returned from the server.");
    }

    return data.viewUrl;
  } catch (error) {
    console.error("Upload error:", error);
    throw error;
  }
}

// Delete an image by filename
export async function deleteImage(filename: string): Promise<void> {
  try {
    const formData = new FormData();
    formData.append("filename", filename);

    const response = await fetch("https://menutogo.at/delete_image.php", {
      method: "POST",
      body: formData,
    });

    const data = await response.json();
    if (response.ok && data.success) {
      console.log("Image deleted:", data.message);
    } else {
      console.error("Delete error:", data.error || "Unknown error");
    }
  } catch (error) {
    console.error("Network error:", error);
  }
}
export async function getImageFile(filename: string): Promise<File> {
  try {
    const response = await fetch(
      `https://menutogo.at/get_image.php?file=${encodeURIComponent(filename)}`,
      {
        method: "GET",
        redirect: "follow",
      }
    );

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    // Convert response to a Blob
    const blob = await response.blob();

    // Convert Blob to File
    const file = new File([blob], filename, { type: blob.type });

    return file;
  } catch (error) {
    console.error("Network error:", error);
    throw error; // Ensure the caller knows the request failed
  }
}

// Extract a filename from a view URL
export function getFilenameFromUrl(viewUrl: string): string | null {
  try {
    const urlObj = new URL(viewUrl);
    return urlObj.searchParams.get("file");
  } catch (e) {
    console.error("Invalid URL:", viewUrl);
    return null;
  }
}
