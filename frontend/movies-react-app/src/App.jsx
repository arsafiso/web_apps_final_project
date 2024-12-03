import "./App.css";
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';  // Updated imports
import Movies from './components/movie/Movie';
import Register from "./components/register/Register";
import Login from "./components/login/login";
import Navigation from "./components/navigation/navigation";
import CookieBanner from "./components/cookieBanner/CookieBanner";
import { UserProvider } from "./components/user/User";
import UserAccount from "./components/UserAccount/UserAccount";

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
