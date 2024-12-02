import "./App.css";
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';  // Updated imports
import Movies from './components/movie/Movie.jsx';
import Register from "./components/register/Register.jsx";
import Login from "./components/login/login.jsx";
import Navigation from "./components/navigation/navigation.jsx";
import UserComponent from './components/user/UserComponent';
import CookieBanner from "./components/cookies/CookieBanner.jsx";
import { UserProvider } from "./components/user/UserContext.jsx";

function App() {

  return (
    <UserProvider>
      {/* <h1>Movies App</h1> */}
      <Router>
        <Navigation />
        <CookieBanner />
        <Routes>  {/* Use Routes instead of Switch */}
          <Route path="/register" element={<Register />} />  
          <Route path="/login" element={<Login />} /> 
          <Route path="/user" element={<UserComponent />} />
        </Routes>
      </Router>
      <Movies />
    </UserProvider>
  );
}

export default App;
