import { Route, BrowserRouter as Router, Routes } from 'react-router-dom'; // Updated imports
import "./App.css";
import CookieBanner from "./components/cookieBanner/CookieBanner";
import Login from "./components/login/login";
import Movies from './components/movie/Movie';
import Navigation from "./components/navigation/navigation";
import PrivateRoute from "./components/private-route/PrivateRoute";
import Register from "./components/register/Register";
import { UserProvider } from "./components/user/User";
import UserAccount from "./components/UserAccount/UserAccount";

function App() {
  return (
    <UserProvider>
      <Router>
        <Navigation />
        <CookieBanner />
        <Routes>
          <Route 
            path="/register" 
            element={
              <PrivateRoute>
                <Register />
              </PrivateRoute>
            } 
          />
          <Route 
            path="/login" 
            element={
              <PrivateRoute>
                <Login />
              </PrivateRoute>
            } 
          />
          
          <Route 
            path="/user" 
            element={
              <PrivateRoute forUserAccount={true}>
                <UserAccount />
              </PrivateRoute>
            } 
          />
          
          <Route path="/" element={<Movies />} />
        </Routes>
      </Router>
    </UserProvider>
  );
}

export default App;
