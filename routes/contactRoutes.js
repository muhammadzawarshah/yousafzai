const express = require('express');
const router = express.Router();
const { getDb } = require('../db');

// Middleware to ensure `db` is available for every request
router.use((req, res, next) => {
    req.db = getDb();
    if (!req.db) {
        return res.status(500).json({ error: "Database connection not established" });
    }
    next();
});

// POST route to add a new Contact Message
router.post("/", async (req, res) => {
    try {
        const contactMsg = {
            name: req.body.name,
            email: req.body.email,
            phone: req.body.phone,
            organization: req.body.organization,
            feedback: req.body.feedback
        };
        const result = await req.db.collection("contact").insertOne(contactMsg);
        res.status(201).json({ message: "Contact message added successfully", id: result.insertedId });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Could not add contact message" });
    }
});

module.exports = router;
