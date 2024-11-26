const express = require('express');
const router = express.Router();
const Movie = require('../models/Movie');
const moviesData = require('../movies.json');

router.post('/init', async (req, res) => {
    try {
        await Movie.deleteMany({});
        await Movie.insertMany(moviesData);
        res.status(200).json({ message: 'Database initialized with movie data.' });
    } catch (err) {
        res.status(500).json({ error: 'Failed to initialize database.', details: err.message });
    }
});

// Get movies by genre (top 10 by rating)
router.get('/:genre', async (req, res) => {
    try {
        const { genre } = req.params;
        const movies = await Movie.find({ genre }).sort({ rating: -1 }).limit(10);
        res.status(200).json(movies);
    } catch (err) {
        res.status(500).json({ error: 'Failed to fetch movies.', details: err.message });
    }
});

// Get all movies
router.get('/', async (req, res) => {
    try {
        const movies = await Movie.find();
        res.status(200).json(movies);
    } catch (err) {
        res.status(500).json({ error: 'Failed to fetch movies.', details: err.message });
    }
});

module.exports = router;
