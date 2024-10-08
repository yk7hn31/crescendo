import { useState, useEffect, useCallback } from 'react';

function useViewport() {
  const [width, setWidth] = useState(window.innerWidth);

  const handleWindowResize = useCallback(() => {
    const newWidth = window.innerWidth;
    setWidth(newWidth);
  }, []);

  useEffect(() => {
    window.addEventListener("resize", handleWindowResize);
    return () => window.removeEventListener("resize", handleWindowResize);
  }, [handleWindowResize]);

  const isMobile = width <= 640;
  const isTablet = width > 640 && width <= 1024;
  const isDesktop = width > 1024;

  return { width, isMobile, isTablet, isDesktop };
}

export { useViewport };