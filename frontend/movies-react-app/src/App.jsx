import "./App.css";
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';  // Updated imports
import Movies from './components/movie/Movie.jsx';
import Register from "./components/register/Register.jsx";
import Login from "./components/login/login.jsx";
import Navigation from "./components/navigation/navigation.jsx";
import CookieBanner from "./components/cookieBanner/CookieBanner.jsx";
import { UserProvider } from "./components/user/User.jsx";
import UserAccount from "./components/UserAccount/UserAccount.jsx";

function App() {

  return (
    <UserProvider>
      <Router>
        <Navigation />
        <CookieBanner />
        <Routes>  {/* Use Routes instead of Switch */}
          <Route path="/register" element={<Register />} />  
          <Route path="/login" element={<Login />} /> 
          <Route path="/user" element={<UserAccount />} />  
          <Route path="/" element={<Movies />} />
        </Routes>
      </Router>
    </UserProvider>
  );
}

export default App;
