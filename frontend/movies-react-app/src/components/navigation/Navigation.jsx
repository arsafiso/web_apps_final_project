import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const base_url = 'http://localhost:3000/api';

const Navigation = () => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    useEffect(() => {
        // Check if the user is logged in by making a request to the backend
        fetch(`${base_url}/users/check-session`, {
            method: 'GET',
            credentials: 'include', // This ensures cookies are sent with the request
        })
            .then((response) => response.json())
            .then((data) => {
                console.log(data);
                if (data.loggedIn) {
                    setIsLoggedIn(true);
                }
            })
            .catch((error) => {
                console.error('Error checking session:', error);
            });
    }, []);

    const handleLogout = async () => {
        // Log out the user by making a request to the backend to destroy the session
        await fetch(`${base_url}/users/logout`, {
            method: 'POST',
            credentials: 'include', // Include cookies to ensure session is cleared
        });

        setIsLoggedIn(false);
    };

    return (
        <nav>
            <ul>
                {isLoggedIn ? (
                    <>
                        <li>
                            <button onClick={handleLogout}>Logout</button>
                        </li>
                    </>
                ) : (
                    <>
                        <li>
                            <Link to="/register">Register</Link>
                        </li>
                        <li>
                            <Link to="/login">Login</Link>
                        </li>
                    </>
                )}
            </ul>
        </nav>
    );
};

export default Navigation;
