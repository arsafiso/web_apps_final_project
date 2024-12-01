import React, { useState, useEffect } from 'react';
import axios from 'axios';

const UserAccount = () => {
  const [favoriteMovies, setFavoriteMovies] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
   
    axios.get('http://localhost:3000/api/users/favorites', { withCredentials: true })
      .then(response => {
        setFavoriteMovies(response.data); 
        setLoading(false); 
      })
      .catch(err => {
        console.error('Error fetching favorite movies:', err);
        setLoading(false);
      });
  }, []);

  return (
    <div className="user-account">
      <h1>Your Favorite Movies</h1>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <div className="movie-cards">
          {favoriteMovies.length > 0 ? (
            favoriteMovies.map((movie) => (
              <div key={movie._id} className="movie-card">
                <img src={movie.info.image_url} alt={movie.title} />
                <div className="movie-details">
                  <h3>{movie.title} ({movie.year})</h3>
                  <p>{movie.info.plot}</p>
                </div>
              </div>
            ))
          ) : (
            <p>You have no favorite movies yet.</p>
          )}
        </div>
      )}
    </div>
  );
};

export default UserAccount;