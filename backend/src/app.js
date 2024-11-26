const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const cookieParser = require("cookie-parser");
require("dotenv").config();
// const session = require('express-session');
const connectDB = require("./db/connect");
const movieRoutes = require("./routes/movies");
const userRoutes = require("./routes/users");

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(bodyParser.json());
app.use(cors());
app.use(cookieParser());

/*
app.use(
    session({
        secret: 'supersecretkey',
        resave: false,
        saveUninitialized: true,
    })
); */

// Connect to MongoDB
connectDB();

// Routes
app.use("/api/movies", movieRoutes);
app.use("/api/users", userRoutes);

// Serve React build (frontend)
const path = require("path");
app.use(
  express.static(path.join(__dirname, "../../frontend/movies-react-app/dist"))
);
app.get("*", (req, res) => {
  res.sendFile(
    path.join(__dirname, "../../frontend/movies-react-app/dist/index.html")
  );
});

// Start server
app.listen(PORT, () =>
  console.log(`Server running on http://localhost:${PORT}`)
);
