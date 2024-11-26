const mongoose = require('mongoose');

const MovieSchema = new mongoose.Schema({
    year: { type: Number, required: true },
    title: { type: String, required: true },
    info: {
        directors: { type: [String], required: true },
        release_date: { type: Date, required: false },
        rating: { type: Number, required: false },
        genres: { type: [String], required: true },
        image_url: { type: String, required: false },
        plot: { type: String, required: false },
        rank: { type: Number, required: false },
        running_time_secs: { type: Number, required: false },
        actors: { type: [String], required: false }
    }
});

module.exports = mongoose.model('Movie', MovieSchema);