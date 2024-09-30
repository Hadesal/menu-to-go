const adjustBrightness = (color: string, amount: number): string => {
  let usePound = false;

  // Remove the '#' symbol if present
  if (color.startsWith("#")) {
    color = color.slice(1);
    usePound = true;
  }

  // Parse the color string to a number
  const num = parseInt(color, 16);

  // Extract the RGB components
  let r = (num >> 16) + amount;
  let g = ((num >> 8) & 0x00ff) + amount;
  let b = (num & 0x0000ff) + amount;

  // Clamp RGB values to the range [0, 255]
  r = Math.min(255, Math.max(0, r));
  g = Math.min(255, Math.max(0, g));
  b = Math.min(255, Math.max(0, b));

  // Return the adjusted color, with padding to ensure it is 6 characters long
  const adjustedColor = ((r << 16) | (g << 8) | b)
    .toString(16)
    .padStart(6, "0");

  return (usePound ? "#" : "") + adjustedColor;
};

// Converts a hex color to an RGBA string, with optional alpha transparency
const hexToRgba = (hex: string, alpha: number = 1): string => {
  // Validate and normalize the hex input
  let cleanHex = hex.startsWith("#") ? hex.slice(1) : hex;

  // Ensure the hex code is valid
  if (cleanHex.length !== 6 && cleanHex.length !== 3) {
    throw new Error("Invalid hex color format");
  }

  // Expand shorthand hex (e.g., "03F" becomes "0033FF")
  if (cleanHex.length === 3) {
    cleanHex = cleanHex
      .split("")
      .map((char) => char + char)
      .join("");
  }

  // Convert the hex to RGB values
  const [r, g, b] = cleanHex.match(/\w\w/g)!.map((x) => parseInt(x, 16));

  return `rgba(${r}, ${g}, ${b}, ${alpha})`;
};

export { hexToRgba, adjustBrightness };
