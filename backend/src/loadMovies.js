const fs = require('fs');
const path = require('path');
const connectDB = require('./db/connect');
const Movie = require('./models/Movie');
require('dotenv').config();

const loadMovies = async () => {
    try {
        await connectDB();

        const data = fs.readFileSync(path.join(__dirname, 'movies.json'), 'utf-8');
        const movies = JSON.parse(data);

        await Movie.insertMany(movies);
        console.log('✅ Movies successfully loaded into MongoDB!');
        process.exit(0);
    } catch (err) {
        console.error('❌ Error loading movies:', err.message);
        process.exit(1);
    }
};

loadMovies();
