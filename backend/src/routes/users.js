const express = require('express');
const bcrypt = require('bcrypt');
const User = require('../models/User');
const authenticateToken = require('../middleware/authenticateToken');

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

        res.status(200).json({ message: 'User logged in successfully.' });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server error.' });
    }
});


router.post('/addFavorite', async (req, res) => {
    const { movieTitle } = req.body;

    if (!movieTitle) {
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
        if (user.favoriteMovies.includes(movieTitle)) {
            return res.status(400).json({ message: 'Movie is already in your favorites.' });
        }

        // Add the movie to favorites
        user.favoriteMovies.push(movieTitle);
        await user.save();

        res.status(200).json({ message: 'Movie added to favorites successfully.' });
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


// Route to get user profile (requires authentication)
// router.get('/profile', authenticateToken, async (req, res) => {
//     try {
//         const user = await User.findById(req.user.id).select('-password');
//         if (!user) {
//             return res.status(404).json({ message: 'User not found.' });
//         }
//         res.json(user);
//     } catch (err) {
//         console.error(err);
//         res.status(500).json({ message: 'Server error.' });
//     }
// });

module.exports = router;
