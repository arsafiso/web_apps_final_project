import fallbackImage from '../../assets/placeholder.jpg';
import './MovieRow.css';

const formatDuration = (seconds) => {
  const hours = Math.floor(seconds / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);
  return `${hours ? `${hours}h ` : ''}${minutes}m`;
};

const MovieRow = ({ title, movies, addToFavorites, isFavorite, username }) => {
  return (
    <div className="genre-section">
      <h2>{title}</h2>
      <div className="genre-movies">
        {movies.map((movie) => (
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
              {username && addToFavorites && isFavorite && (
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
  );
};

export default MovieRow;
