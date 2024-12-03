import { createContext, useState } from 'react';
import Cookies from 'js-cookie';

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
          Cookies.set('username', newUsername, { expires: 7 });
        } else {
          Cookies.remove('username');
        }
      }, 
      cookiePreferences, 
      setCookiePreferences: (newPreference) => {
        setCookiePreferences(newPreference);
        if (newPreference) {
          Cookies.set('cookiePreferences', newPreference)

        } else {
          Cookies.remove('cookiePreferences');
        }
      },
    }}>
      {children}
    </UserContext.Provider>
  );
};

export { UserProvider };
export default UserContext;
