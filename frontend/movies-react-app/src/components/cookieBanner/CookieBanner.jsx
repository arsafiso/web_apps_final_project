import { useContext, useState } from 'react';
import UserContext from '../user/User';
import './CookieBanner.css';

const CookieBanner = () => {
  const { cookiePreferences, setCookiePreferences } = useContext(UserContext);
  const [showBanner, setShowBanner] = useState(!cookiePreferences); 

  const handleAcceptCookies = () => {
    setCookiePreferences(true); 
    setShowBanner(false); 
  };

  const handleDeclineCookies = () => {
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
