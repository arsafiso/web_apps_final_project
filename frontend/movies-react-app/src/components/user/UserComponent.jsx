import React, { useEffect, useState } from 'react';

const User = () => {
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

  return (
    <div className="user-info">
      {user ? (
        <p>Welcome, {user.name}!</p>
      ) : (
        <p>Welcome, Guest!</p>
      )}
      {cookiePreferences && (
        <div className="preferences">
          <p>Cookie Preferences:</p>
          <pre>{JSON.stringify(cookiePreferences, null, 2)}</pre>
        </div>
      )}
    </div>
  );
};

export default User;
