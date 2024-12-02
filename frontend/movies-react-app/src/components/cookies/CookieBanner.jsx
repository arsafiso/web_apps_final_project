import React, { useState, useContext } from 'react';
import UserContext from '../../components/user/UserContext'; 
import './Cookie.css';

const CookieBanner = () => {
  const { cookiePreferences, updateCookiePreferences } = useContext(UserContext); 
  const [showBanner, setShowBanner] = useState(!cookiePreferences); 

  const handleAcceptCookies = () => {
    updateCookiePreferences('accepted'); 
    setShowBanner(false); 
  };

  const handleDeclineCookies = () => {
    updateCookiePreferences('declined'); 
    setShowBanner(false); 
  };

  if (!showBanner) return null; 

  return (
    <div className="cookie-banner">
      <p>We use cookies to improve your experience. Do you accept our cookie policy?</p>
      <button onClick={handleAcceptCookies}>Accept</button>
      <button onClick={handleDeclineCookies}>Decline</button>
    </div>
  );
};

export default CookieBanner;
