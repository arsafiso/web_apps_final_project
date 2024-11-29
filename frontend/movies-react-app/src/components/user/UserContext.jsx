import React, { createContext, useState, useEffect } from 'react';

const UserContext = createContext();

const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null); 
  const [cookiePreferences, setCookiePreferences] = useState(null); 

  useEffect(() => {
    const savedUser = localStorage.getItem('user');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }

    const cookieConsent = document.cookie
      .split('; ')
      .find((row) => row.startsWith('cookieConsent='))
      ?.split('=')[1];
    setCookiePreferences(cookieConsent); 
  }, []);

  const loginUser = (userData) => {
    setUser(userData);
    localStorage.setItem('user', JSON.stringify(userData)); 
  };

  const logoutUser = () => {
    setUser(null);
    localStorage.removeItem('user');
  };

  const updateCookiePreferences = (preferences) => {
    setCookiePreferences(preferences);
    document.cookie = `cookieConsent=${preferences}; max-age=31536000`; 
  };

  return (
    <UserContext.Provider value={{ user, loginUser, logoutUser, cookiePreferences, updateCookiePreferences }}>
      {children}
    </UserContext.Provider>
  );
};

export { UserProvider };
export default UserContext;
