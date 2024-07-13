import { useState, useEffect } from 'react';

const useGoogleMaps = (apiKey) => {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const scriptId = 'google-maps-script';
    const existingScript = document.getElementById(scriptId);

    if (!existingScript) {
      const script = document.createElement('script');
      script.id = scriptId;
      script.src = `https://maps.googleapis.com/maps/api/js?key=${apiKey}&libraries=places`;
      script.async = true;
      script.defer = true;
      script.onload = () => setIsLoaded(true);
      document.head.appendChild(script);

      return () => {
        document.head.removeChild(script);
      };
    } else {
      setIsLoaded(true);
    }
  }, [apiKey]);

  return isLoaded;
};

export default useGoogleMaps;
