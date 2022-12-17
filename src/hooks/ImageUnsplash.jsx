import { useState, useEffect } from 'react';



// Hook
function useUnsplashImage(month) {
    console.log(month);
  // Initialize state with undefined width/height so server and client renders match
  // Learn more here: https://joshwcomeau.com/react/the-perils-of-rehydration/
  const [windowSize, setWindowSize] = useState({
    width: undefined,
    height: undefined,
  });

  const [unsplashimg, setUnsplashImg] = useState({
    src: undefined,
    alt: undefined,
  });

  useEffect(() => {
    // only execute all the code below in client side
    if (typeof window !== 'undefined') {
        function handleResize() {
        // Set window width/height to state
            setWindowSize({
            width: window.innerWidth,
            height: window.innerHeight,
            });

            
        }

    
        // Add event listener
        window.addEventListener("resize", handleResize);
        // Call handler right away so state gets updated with initial window size
        handleResize();
        // Remove event listener on cleanup
        return () => {window.removeEventListener("resize", handleResize);}
    }
  }, []); // Empty array ensures that effect is only run on mount
  useEffect(() => {
        function getImage() {
            setUnsplashImg({
                src: 'https://source.unsplash.com/'+windowSize.width+'x'+(windowSize.height*10)/100+'/?landscape+'+month,
                alt: 'random unsplash landscape'
            });
        }

        window.addEventListener("getImage", getImage);
        getImage();
        
        // Remove event listener on cleanup
        return () => {window.removeEventListener("getImage", getImage)}
  }, [windowSize, month]); // Empty array ensures that effect is only run on mount

  return unsplashimg;
}

// Usage
export default useUnsplashImage;