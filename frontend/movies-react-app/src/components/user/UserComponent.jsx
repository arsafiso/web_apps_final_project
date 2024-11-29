import React, { useContext } from 'react';
import UserContext from './UserContext'; 
const UserComponent = () => {
  const { user, logoutUser } = useContext(UserContext); 
  
  if (!user) {
    return <p>You are not logged in. Please sign in to like movies.</p>;
  }

  return (
    <div>
      <h2>Welcome, {user.name}!</h2>
      <p>Email: {user.email}</p>
      <button onClick={logoutUser}>Logout</button>
    </div>
  );
};

export default UserComponent;
