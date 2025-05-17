import { useEffect } from 'react';
import { useLocation } from 'wouter';

// This component will scroll the window to top whenever the location changes
// Useful for single page applications where routing doesn't naturally scroll to top
const ScrollToTop = () => {
  const [location] = useLocation();
  
  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: 'instant' // Use 'smooth' for animated scrolling, 'instant' for immediate
    });
  }, [location]);
  
  return null; // This component doesn't render anything
};

export default ScrollToTop;