import "./App.css";
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';  // Updated imports
import Movies from './components/movie/Movie.jsx';
import Register from "./components/register/Register.jsx";
import Login from "./components/login/login.jsx";
import Navigation from "./components/navigation/navigation.jsx";

function App() {

  return (
    <>
      <h1>Movies App</h1>
      <Router>
        <Navigation />
        <Routes>  {/* Use Routes instead of Switch */}
          <Route path="/register" element={<Register />} />  
          <Route path="/login" element={<Login />} /> 
        </Routes>
      </Router>
      <Movies />
    </>
  );
}

export default App;
