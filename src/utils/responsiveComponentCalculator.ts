const breakpoints = {
  xs: 0, // Extra small screens (mobile devices)
  sm: 600, // Small screens (tablets)
  md: 960, // Medium screens (small laptops)
  lg: 1280, // Large screens (desktops)
  xl: 1920, // Extra large screens (large desktops)
};

// Define component sizes as a percentage of the viewport size
const componentSizes = {
  xs: 0.5, // 50% of viewport size
  sm: 0.6, // 60% of viewport size
  md: 0.7, // 70% of viewport size
  lg: 0.8, // 80% of viewport size
  xl: 0.9, // 90% of viewport size
};

function getScreenSize(): keyof typeof breakpoints {
  const width = window.innerWidth;

  if (width < breakpoints.sm) return "xs";
  if (width >= breakpoints.sm && width < breakpoints.md) return "sm";
  if (width >= breakpoints.md && width < breakpoints.lg) return "md";
  if (width >= breakpoints.lg && width < breakpoints.xl) return "lg";
  return "xl"; // For widths equal to or greater than 1920px
}

export default function calculateComponentSize(sizePercentage: number) {
  const screenSize = getScreenSize();
  const viewportWidth = window.innerWidth;
  const viewportHeight = window.innerHeight;

  // Ensure sizePercentage is between 0 and 1
  if (sizePercentage < 0 || sizePercentage > 1) {
    throw new Error("sizePercentage must be between 0 and 1");
  }

  const sizeFactor = componentSizes[screenSize];
  const width = sizeFactor * sizePercentage * viewportWidth;
  const height = sizeFactor * sizePercentage * viewportHeight;

  return {
    width,
    height,
  };
}
