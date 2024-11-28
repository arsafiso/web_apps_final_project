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

// Get movies by titles
router.post('/titles', async (req, res) => {
    try {
        const titles = req.body.titles; // Expecting a list of movie titles in the request body
        if (!titles || !Array.isArray(titles)) {
            return res.status(400).json({ error: 'Please provide a list of titles.' });
        }

        // Find movies by the list of titles
        const movies = await Movie.find({ title: { $in: titles } });

        res.status(200).json(movies);
    } catch (err) {
        res.status(500).json({ error: 'Failed to fetch movies by titles.', details: err.message });
    }
});

module.exports = router;
