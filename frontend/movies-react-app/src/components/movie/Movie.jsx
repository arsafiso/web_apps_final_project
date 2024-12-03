import React, { useEffect, useState, useContext } from 'react';
import './Movie.css';
import fallbackImage from '../../assets/placeholder.jpg';
import UserContext from '../user/User';

const Movies = () => {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [favorites, setFavorites] = useState([]);
  const { username } = useContext(UserContext);

  const fetchMovies = async () => {
    try {
      const res = await fetch('http://localhost:3000/api/movies');
      const data = await res.json();
      setMovies(data);
    } catch (err) {
      console.error('Error fetching movies:', err);
    } finally {
      setLoading(false);
    }
  };

  const fetchFavorites = async () => {
    try {
      const res = await fetch('http://localhost:3000/api/users/favorites', {
        credentials: 'include',
      });
      const data = await res.json();

      if (res.status === 200 && data.favoriteMovies) {
        setFavorites(data.favoriteMovies);
      } else {
        console.error('Failed to fetch favorites:', data);
      }
    } catch (err) {
      console.error('Error fetching favorites:', err);
    }
  };

  useEffect(() => {

  
    fetchMovies();
    if (username) {
      fetchFavorites();
    }
  }, []);


  const addToFavorites = async (movieId) => {
    try {
      const res = await fetch('http://localhost:3000/api/users/favorites', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ movieId }),
        credentials: 'include',
      });

      const data = await res.json();
      if (res.status === 200) {
          setFavorites((prevFavorites) => [...prevFavorites, movieId]);
      } else {
        console.error('Failed to add to favorites:', data);
      }
    } catch (err) {
      console.error('Error adding movie to favorites:', err);
    }
  };

const isFavorite = (movieId) => {
  return favorites.some(fav => fav === movieId);
};

const formatDuration = (seconds) => {
  const hours = Math.floor(seconds / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);
  return `${hours ? `${hours}h ` : ''}${minutes}m`;
};

  if (loading) {
    return (
      <div className="loader-container">
        <div className="loader"></div>
        <p>Loading movies...</p>
      </div>
    );
  }

  if (!movies.length) {
    return <div><h1>Movies</h1><p>No movies available</p></div>;
  }

  
  const moviesByGenre = movies.reduce((acc, movie) => {
    movie.info.genres?.forEach((genre) => {
      if (!acc[genre]) acc[genre] = [];
      acc[genre].push(movie);
    });
    return acc;
  }, {});

  Object.keys(moviesByGenre).forEach((genre) => {
    moviesByGenre[genre] = moviesByGenre[genre]
      .sort((a, b) => b.info.rating - a.info.rating)
      .slice(0, 10);
  });

  return (
    <div>
      <div className="movies-container">
        {Object.keys(moviesByGenre).map((genre) => (
          <div key={genre} className="genre-section">
            <h2>{genre}</h2>
            <div className="genre-movies">
              {moviesByGenre[genre].map((movie) => (
                <div key={movie._id} className="movie-card">
              <img
                  src={movie.info.image_url}
                  alt={movie.title || 'No title available'}
                  className="movie-image"
                  onError={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    e.target.onerror = null;
                    e.target.src = fallbackImage;
                  }}
                />
                  <div className="movie-details">
                    <h3>{movie.title}</h3>
                    <p><strong>Rating:</strong> {movie.info.rating || 'N/A'}</p>
                    <p><strong>Duration:</strong> {formatDuration(movie.info.running_time_secs) || 'N/A'}</p>
                    {username && (
                      <button 
                        onClick={() => addToFavorites(movie._id)}
                        disabled={isFavorite(movie._id)} 
                        className="add-to-favorites-btn"
                      >
                        {isFavorite(movie._id) ? 'Added to Favorites' : 'Add to Favorites'}
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Movies;