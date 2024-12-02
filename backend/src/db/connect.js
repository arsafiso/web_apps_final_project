const mongoose = require('mongoose');
const Movie = require('../models/Movie');
const moviesData = require('../movies.json');
require('dotenv').config();

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost:27017/movies-group-6', {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        const movies = await Movie.find();
        console.log('Connected to MongoDB');
        if (movies.length === 0) {
            console.log("Inserting movies");
            await Movie.insertMany(moviesData);
        }
    } catch (err) {
        console.error('Failed to connect to MongoDB', err);
        process.exit(1);
    }
};

module.exports = connectDB;
