import React, { useState, useEffect } from 'react';

const CookieBanner = () => {
  const [user, setUser] = useState(null);
  const [cookiePreferences, setCookiePreferences] = useState(null);
  const [isBannerVisible, setBannerVisible] = useState(true);

  useEffect(() => {
    try {
      const savedUser = localStorage.getItem('user');
      if (savedUser) {
        setUser(JSON.parse(savedUser));
      }

      // Retrieve cookie preferences from cookies
      const cookieConsent = document.cookie
        .split('; ')
        .find((row) => row.startsWith('cookieConsent='))
        ?.split('=')[1];
      setCookiePreferences(cookieConsent); // Set cookie preferences state
    } catch (error) {
      console.error("Error loading user or cookie preferences:", error);
    }
  }, []);

  const handleAccept = () => {
    try {
      setCookiePreferences('accepted');
      document.cookie = `cookieConsent=accepted; max-age=31536000`; 
      setBannerVisible(false); 
    } catch (error) {
      console.error("Error handling cookie consent acceptance:", error);
    }
  };

  const handleDecline = () => {
    try {
      setCookiePreferences('declined');
      document.cookie = `cookieConsent=declined; max-age=31536000`; 
      setBannerVisible(false); 
    } catch (error) {
      console.error("Error handling cookie consent decline:", error);
    }
  };

  if (!isBannerVisible) return null;
  console.log ({cookiePreferences})

  return (
    <div className="cookie-banner">
      <p>We use cookies to improve your experience on our site.</p>
      <div className="cookie-actions">
        <button onClick={handleAccept}>Accept</button>
        <button onClick={handleDecline}>Decline</button>
      </div>
      {user && <p>Welcome, {user.name}!</p>} {/* Display user name if available */}
      {cookiePreferences && (
        
        <div className="preferences">
          {/* <p>Cookie Preferences: {cookiePreferences}</p> */}
        </div>
      )}
    </div>
  );
};

export default CookieBanner;
