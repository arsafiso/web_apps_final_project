const express = require('express');
const bcrypt = require('bcrypt');
const User = require('../models/User');
const Movie = require('../models/Movie');

const router = express.Router();

// Route to handle user registration
router.post('/register', async (req, res) => {
    const { firstName, lastName, email, password } = req.body;

    if (!firstName || !lastName || !email || !password) {
        return res.status(400).json({ message: 'All fields are required.' });
    }

    try {
        // Check if user already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(409).json({ message: 'User already exists.' });
        }

        // Hash password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Save user to database
        const newUser = new User({ firstName, lastName, email, password: hashedPassword });
        await newUser.save();

        res.status(201).json({ message: 'User registered successfully.' });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server error.' });
    }
});

// Route to handle user login
router.post('/login', async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({ message: 'Email and password are required.' });
    }

    try {
        // Check if user exists
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).json({ message: 'User not found.' });
        }

        // Compare password
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(401).json({ message: 'Invalid credentials.' });
        }

        // Store user info in the session
        req.session.userId = user._id;  // Store user ID in the session

        res.status(200).json({ message: 'User logged in successfully.', firstName: user.firstName });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server error.' });
    }
});


router.post('/favorites', async (req, res) => {
    const { movieId } = req.body;

    if (!movieId) {
        return res.status(400).json({ message: 'Movie title is required.' });
    }

    try {
        // Check if user is logged in (session ID should be present)
        if (!req.session.userId) {
            return res.status(401).json({ message: 'You must be logged in to add a favorite movie.' });
        }

        // Find the user by session userId
        const user = await User.findById(req.session.userId); 

        if (!user) {
            return res.status(404).json({ message: 'User not found.' });
        }

        // Check if movie is already in favorites
        if (user.favoriteMovies.includes(movieId)) {
            return res.status(400).json({ message: 'Movie is already in your favorites.' });
        }

        // Add the movie to favorites
        user.favoriteMovies.push(movieId);
        await user.save();

        res.status(200).json({ favoriteMovies: 'Movie added to favorites successfully.' });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server error.' });
    }
});

router.get('/favorites', async (req, res) => {
    try {
        // Check if user is logged in (session ID should be present)
        if (!req.session.userId) {
            return res.status(401).json({ message: 'You must be logged in get favorite movies.' });
        }

        // Find the user by session userId
        const user = await User.findById(req.session.userId); 

        if (!user) {
            return res.status(404).json({ message: 'User not found.' });
        }

        res.status(200).json({ favoriteMovies: user.favoriteMovies });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server error.' });
    }
});

router.post('/logout', (req, res) => {
    if (!req.session.userId) {
        return res.status(400).json({ message: 'No user is logged in.' });
    }

    req.session.destroy((err) => {
        if (err) {
            return res.status(500).json({ message: 'Failed to log out.' });
        }

        // Clear the session cookie
        res.clearCookie('connect.sid');  // Clear the session cookie

        res.status(200).json({ message: 'Logged out successfully.' });
    });
});

router.get('/profile', async (req, res) => {
    try {
        // Check if user is logged in (session ID should be present)
        if (!req.session.userId) {
            return res.status(401).json({ message: 'You must be logged in to get favorite movies.' });
        }

        // Find the user by session userId
        const user = await User.findById(req.session.userId); 

        if (!user) {
            return res.status(404).json({ message: 'User not found.' });
        }

        // Find movies whose IDs are in user's favoriteMovieIds array
        const favoriteMovies = await Movie.find({
            _id: { $in: user.favoriteMovies }
        });

        res.status(200).json({ favoriteMovies: favoriteMovies, firstName: user.firstName, lastName: user.lastName }); // Return the full movie objects
    } catch (err) {
        console.error('Error fetching favorite movies:', err);
        res.status(500).json({ message: 'Server error.' });
    }
});

router.delete('/delete', async (req, res) => {
    try {
        // Check if user is logged in (session ID should be present)
        if (!req.session.userId) {
            return res.status(401).json({ message: 'You must be logged in to delete your account.' });
        }

        // Find the user by session userId
        const user = await User.findById(req.session.userId);

        if (!user) {
            return res.status(404).json({ message: 'User not found.' });
        }

        // Delete the user
        await User.findByIdAndDelete(req.session.userId);

        // Destroy the session
        req.session.destroy(err => {
            if (err) {
                return res.status(500).json({ message: 'Failed to destroy session after account deletion.' });
            }

            res.status(200).json({ message: 'Account deleted successfully.' });
        });
    } catch (err) {
        console.error('Error deleting account:', err);
        res.status(500).json({ message: 'Server error.' });
    }
});

module.exports = router;
