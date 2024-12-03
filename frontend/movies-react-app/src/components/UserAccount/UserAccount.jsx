import React, { useState, useEffect } from 'react';

const UserAccount = () => {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await fetch('http://localhost:3000/api/users/profile', { credentials: 'include' });
        if (!res.ok) {
          throw new Error('Failed to fetch profile');
        }
        const data = await res.json();
      
        setProfile(data);
      } catch (err) {
        console.error('Error fetching profile:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, []);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (!profile) {
    return <p>Failed to load profile. Please try again later.</p>;
  }

  const { firstName, lastName, favoriteMovies } = profile;

  return (
    <div className="user-account">
      <h1>Hello, {firstName} {lastName}</h1>
      <h2>Your Favorite Movies</h2>
      {favoriteMovies.length === 0 ? (
        <p>You have no favorite movies yet.</p>
      ) : (
        <div className="movie-titles">
          {favoriteMovies.map((movie) => (
            <span key={movie._id} className="movie-title">
              {movie.title}
            </span>
          ))}
        </div>
      )}
    </div>
  );
};

export default UserAccount;
