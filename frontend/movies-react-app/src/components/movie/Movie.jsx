import React, { useEffect, useState } from 'react';
import './Movie.css';

const Movies = () => {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const res = await fetch('http://localhost:3000/api/movies');
        const data = await res.json();
        console.log('Fetched movies:', data);
        setMovies(data);
      } catch (err) {
        console.error('Error fetching movies:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchMovies();
  }, []);

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

  // Organize and sort movies by genre, getting top 10 by rating
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

  const formatDuration = (seconds) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    return `${hours ? `${hours}h ` : ''}${minutes}m`;
  };

  return (
    <div>
      <h1>Movies by Genre</h1>
      <div className="movies-container">
        {Object.keys(moviesByGenre).map((genre) => (
          <div key={genre} className="genre-section">
            <h2>{genre}</h2>
            <div className="genre-movies">
              {moviesByGenre[genre].map((movie) => (
                <div key={movie._id} className="movie-card">
                  <img
                    src={movie.info.image_url || 'https://via.placeholder.com/200'}
                    alt={movie.title}
                    className="movie-image"
                  />
                  <div className="movie-details">
                    <h3>{movie.title}</h3>
                    <p><strong>Rating:</strong> {movie.info.rating || 'N/A'}</p>
                    <p><strong>Duration:</strong> {formatDuration(movie.info.running_time_secs) || 'N/A'}</p>
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
