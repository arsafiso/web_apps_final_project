import Cookies from 'js-cookie';
import { createContext, useState } from 'react';

const UserContext = createContext();

const UserProvider = ({ children }) => {
  const [username, setUsername] = useState(() => {
    return Cookies.get('username');
  });

  const [cookiePreferences, setCookiePreferences] = useState(() => {
    return Cookies.get('cookiePreferences');
  });

  return (
    <UserContext.Provider value={{ 
      username, 
      setUsername: (newUsername) => {
        setUsername(newUsername);
        if (newUsername) {
          Cookies.set('username', newUsername, { expires: 1 });
        } else {
          Cookies.remove('username');
        }
      }, 
      cookiePreferences, 
      setCookiePreferences: (newPreference) => {
        setCookiePreferences(newPreference);
        Cookies.set('cookiePreferences', newPreference, { expires: 1 })
      },
    }}>
      {children}
    </UserContext.Provider>
  );
};

export { UserProvider };
export default UserContext;
