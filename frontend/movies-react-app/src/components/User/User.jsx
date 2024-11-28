import React, { useContext } from 'react';
import { UserContext } from './UserContext';

const User = () => {
  const { user, cookiePreferences } = useContext(UserContext); // Access user and preferences

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
