import { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import netflixImage from '../../assets/netflix_logo.png';
import UserContext from '../user/User';
import './Navigation.css';

const base_url = process.env.REACT_APP_API_URL ? `${process.env.REACT_APP_API_URL}` : 'http://localhost:3000';

const Navigation = () => {
    const { username, setUsername, setCookiePreferences } = useContext(UserContext);
    const navigate = useNavigate();

    const handleLogout = async () => {
        // Log out the user by making a request to the backend to destroy the session
        await fetch(`${base_url}/api/users/logout`, {
            method: 'POST',
            credentials: 'include', // Include cookies to ensure session is cleared
        });

        setUsername(null);
        setCookiePreferences(false);
        navigate('/login'); 
    };

    const navigateHome = () => { navigate('/'); }

    return (
        <nav className="navbar">
            <div className="logo-container" onClick={navigateHome}>
                <img src={netflixImage} alt="Netflix Logo" className="logo" />
            </div>
            <ul className="nav-items">
                {username ? (
                    <>
                        <li className="nav-item">
                            <Link to="/user" className="profile-button">Hello, {username}</Link>
                        </li>
                        <li className="nav-item">
                            <button onClick={handleLogout} className="logout-button">Logout</button>
                        </li>
                    </>
                ) : (
                    <>
                        <li className="nav-item">
                            <Link to="/register" className="register-link">Register</Link>
                        </li>
                        <li className="nav-item">
                            <Link to="/login" className="login-link">Login</Link>
                        </li>
                    </>
                )}
            </ul>
        </nav>
    );
};

export default Navigation;
