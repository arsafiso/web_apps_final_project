import React, { useState, useEffect, createContext } from 'react';

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null); // Holds user data
  const [cookiePreferences, setCookiePreferences] = useState(null); // Holds cookie preference data

  // Check localStorage or cookies on app load
  useEffect(() => {
    // 1. Retrieve user data from localStorage
    const savedUser = localStorage.getItem('user');
    if (savedUser) {
      setUser(JSON.parse(savedUser)); // Parse JSON and update user state
    }

    // 2. Retrieve cookie preferences from cookies
    const cookieConsent = document.cookie
      .split('; ')
      .find((row) => row.startsWith('cookieConsent='))
      ?.split('=')[1];
    setCookiePreferences(cookieConsent); // Update cookiePreferences state
  }, []);

  // Login function to save user data
  const loginUser = (userData) => {
    setUser(userData);
    localStorage.setItem('user', JSON.stringify(userData)); // Save user data to localStorage
  };

  // Update cookie preferences
  const updateCookiePreferences = (preferences) => {
    setCookiePreferences(preferences);
    document.cookie = `cookieConsent=${preferences}; max-age=31536000`; // Save preference to cookies for 1 year
  };

  return (
    <UserContext.Provider value={{ user, loginUser, cookiePreferences, updateCookiePreferences }}>
      {children}
    </UserContext.Provider>
  );
};
