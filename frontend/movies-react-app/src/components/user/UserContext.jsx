// src/context/UserContext.js

import React, { createContext, useState, useEffect } from 'react';

// Create the UserContext with default values
const UserContext = createContext();

// UserProvider component to manage user state and cookie preferences
const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null); // Holds the logged-in user's info
  const [cookiePreferences, setCookiePreferences] = useState(null); // Holds cookie consent preference

  // Use useEffect to load user and cookie preferences from localStorage and cookies when the app starts
  useEffect(() => {
    // Retrieve saved user from localStorage
    const savedUser = localStorage.getItem('user');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }

    // Retrieve saved cookie consent from document cookies
    const cookieConsent = document.cookie
      .split('; ')
      .find((row) => row.startsWith('cookieConsent='))
      ?.split('=')[1];
    setCookiePreferences(cookieConsent); // Set cookie consent from cookie
  }, []);

  // Handle user login and save to localStorage
  const loginUser = (userData) => {
    setUser(userData);
    localStorage.setItem('user', JSON.stringify(userData)); // Save user data to localStorage
  };

  // Handle user logout and remove from localStorage
  const logoutUser = () => {
    setUser(null);
    localStorage.removeItem('user');
  };

  // Handle updating cookie preferences and saving to cookies
  const updateCookiePreferences = (preferences) => {
    setCookiePreferences(preferences);
    document.cookie = `cookieConsent=${preferences}; max-age=31536000`; // Store cookie preferences for 1 year
  };

  return (
    <UserContext.Provider value={{ user, loginUser, logoutUser, cookiePreferences, updateCookiePreferences }}>
      {children}
    </UserContext.Provider>
  );
};

export { UserProvider };
export default UserContext;
