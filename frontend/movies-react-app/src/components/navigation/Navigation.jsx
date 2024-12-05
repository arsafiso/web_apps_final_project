import { useState, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import netflixImage from '../../assets/netflix_logo.png';
import UserContext from '../user/User';
import './Navigation.css';

const base_url = process.env.REACT_APP_API_URL || 'http://localhost:3000';

const Navigation = () => {
    const { username, setUsername, setCookiePreferences } = useContext(UserContext);
    const [showSubmenu, setShowSubmenu] = useState(false);
    const [showModal, setShowModal] = useState(false);
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

    const handleMouseEnter = () => {
        setShowSubmenu(true);
    };

    const handleMouseLeave = () => {
        setShowSubmenu(false);
    };

    const handleDeleteAccount = async () => {
        try {
            const res = await fetch(`${base_url}/api/users/delete`, {
                method: 'DELETE',
                credentials: 'include',
            });

            if (res.status === 200) {
                console.log('Account deleted successfully');
                setUsername(null);
                setShowModal(false);
                navigate('/login');
            } else {
                console.error('Failed to delete account');
            }
        } catch (err) {
            console.error('Error deleting account:', err);
        }
    };

    return (
        <>
            <nav className="navbar">
                <div className="logo-container" onClick={navigateHome}>
                    <img src={netflixImage} alt="Netflix Logo" className="logo" />
                </div>
                <ul className="nav-items">
                {username ? (
                    <>
                    <li
                        className="nav-item"
                        onMouseEnter={handleMouseEnter}
                        onMouseLeave={handleMouseLeave}
                    >
                        <Link to="/user" className="profile-button">Hello, {username}</Link>
                        {showSubmenu && (
                        <div className="submenu">
                            <button onClick={() => setShowModal(true)}>Delete Account</button>
                        </div>
                        )}
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

            {showModal && (
                <div className="modal">
                <div className="modal-content">
                    <h2>Are you sure you want to delete your account?</h2>
                    <button onClick={handleDeleteAccount} className="confirm-button">Yes, delete my account</button>
                    <button onClick={() => setShowModal(false)} className="cancel-button">Cancel</button>
                </div>
                </div>
            )}
        </>
    );
};

export default Navigation;
