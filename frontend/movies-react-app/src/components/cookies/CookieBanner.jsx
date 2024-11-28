import React, { useContext, useState } from 'react';
import { UserContext } from '../User/UserContext';

const CookieBanner = () => {
  const { updateCookiePreferences } = useContext(UserContext); // Access updateCookiePreferences
  const [isBannerVisible, setBannerVisible] = useState(true);

  const handleAccept = () => {
    updateCookiePreferences("accepted"); // Update context and save to cookies
    setBannerVisible(false); // Hide the banner
  };

  const handleDecline = () => {
    updateCookiePreferences("declined"); // Update context and save to cookies
    setBannerVisible(false); // Hide the banner
  };

  if (!isBannerVisible) return null;

  return (
    <div className="cookie-banner">
      <p>We use cookies to improve your experience on our site.</p>
      <div className="cookie-actions">
        <button onClick={handleAccept}>Accept</button>
        <button onClick={handleDecline}>Decline</button>
      </div>
    </div>
  );
};

export default CookieBanner;
