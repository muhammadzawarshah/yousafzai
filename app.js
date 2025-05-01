// Import required modules
const express = require('express');
const cors = require("cors");
const { connectToDb, getDb, closeDb } = require('./db');

// Import route modules
const memberRoutes = require('./routes/memberRoutes');
const contactRoutes = require('./routes/contactRoutes');
const newsRoutes = require('./routes/newsRoutes'); // Added newsRoutes

// Create Express app
const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public")); // For public pages
app.use('/admin', express.static('admin')); // For admin pages

let db; // Global DB variable

// Connect to the database
connectToDb((err) => {
    if (!err) {
        db = getDb();
        console.log('Database connected successfully');

        // Start the server
        app.listen(3000, () => {
            console.log('Server is running on port 3000');
        });
    } else {
        console.error('Error connecting to the database:', err);
    }
});

// Use API routes
app.use("/members", memberRoutes);
app.use("/contact", contactRoutes);
app.use("/api/news", newsRoutes); // API route for news

// Graceful shutdown
process.on("SIGINT", () => {
    console.log("Shutting down server...");
    closeDb();
    process.exit(0);
});

process.on("SIGTERM", () => {
    console.log("Shutting down server...");
    closeDb();
    process.exit(0);
});
