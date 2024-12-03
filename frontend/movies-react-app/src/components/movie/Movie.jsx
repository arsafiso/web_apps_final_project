import  { useEffect, useState, useContext } from 'react';
import './Movie.css';
import UserContext from '../user/User';
import MovieRow from '../movie-row/MovieRow';


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
  }, [username]);


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
    <div className="movies-container">
      {Object.keys(moviesByGenre).map((genre) => (
        <MovieRow
          key={genre}
          title={genre}
          movies={moviesByGenre[genre]}
          username={username}
          addToFavorites={addToFavorites}
          isFavorite={isFavorite}
        />
      ))}
    </div>
  );
};

export default Movies;