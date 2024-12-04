require('dotenv').config({ path: '../.env' });
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const session = require('express-session');
const connectDB = require("./db/connect");
const movieRoutes = require("./routes/movies");
const userRoutes = require("./routes/users");

const app = express();
const PORT = process.env.PORT || 3000;
const allowedOrigins = ['http://localhost:5173', process.env.ALLOWED_ORIGIN];

const corsOptions = {
    origin: (origin, callback) => {
        if (allowedOrigins.indexOf(origin) !== -1 || !origin) {
        callback(null, true);
        } else {
        callback(new Error('Not allowed by CORS'));
        }
    },
    methods: 'GET,POST,PUT,DELETE',
    credentials: true,
};


app.use(bodyParser.json());
app.use(cors(corsOptions));
app.use(cookieParser());

app.use(session({
  secret: process.env.SESSION_SECRET || "abcd01234", 
  resave: false,  
  saveUninitialized: false,  
  cookie: {
      httpOnly: true,
      domain: 'localhost',  
      maxAge: 24 * 60 * 60  
  }
}));


connectDB();


app.use("/api/movies", movieRoutes);
app.use("/api/users", userRoutes);


const path = require("path");
// Serve static files from the 'build' folder
app.use(
  express.static(path.join(__dirname, "../build"))
);

// Serve the index.html file for all other routes
app.get("*", (req, res) => {
  res.sendFile(
    path.join(__dirname, "../build/index.html")
  );
});


app.listen(PORT, () =>
  console.log(`Server running on http://localhost:${PORT}`)
);
