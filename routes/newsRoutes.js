const express = require("express");
const router = express.Router();
const { getDb } = require("../db");
const { ObjectId } = require("mongodb");

// Middleware to set db
router.use((req, res, next) => {
    req.db = getDb();
    if (!req.db) {
        return res.status(500).json({ error: "Database connection not established" });
    }
    next();
});

// POST: Add news
router.post("/", async (req, res) => {
    try {
        const { title, date, description } = req.body;
        if (!title || !date || !description) {
            return res.status(400).json({ error: "Missing required fields" });
        }

        const result = await req.db.collection("news").insertOne({ title, date, description });
        res.status(201).json({ message: "News added successfully", id: result.insertedId });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Failed to add news" });
    }
});

// GET: All news
router.get("/", async (req, res) => {
    try {
        const newsList = await req.db.collection("news").find().sort({ date: -1 }).toArray();
        res.json(newsList);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Failed to fetch news" });
    }
});
// GET: Single news item by ID
router.get("/:id", async (req, res) => {
    try {
        const newsId = req.params.id;
        const newsItem = await req.db.collection("news").findOne({ _id: new ObjectId(newsId) });

        if (!newsItem) {
            return res.status(404).json({ error: "News not found" });
        }

        res.json(newsItem);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Failed to fetch news details" });
    }
});

// PUT: Update news
router.put("/:id", async (req, res) => {
    try {
        const newsId = req.params.id;
        const { title, date, description } = req.body;

        const result = await req.db.collection("news").updateOne(
            { _id: new ObjectId(newsId) },
            { $set: { title, date, description } }
        );

        if (result.modifiedCount === 0) {
            return res.status(404).json({ error: "News not found or already up to date" });
        }

        res.json({ message: "News updated successfully" });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Failed to update news" });
    }
});

// DELETE: Remove news
router.delete("/:id", async (req, res) => {
    try {
        const newsId = req.params.id;
        const result = await req.db.collection("news").deleteOne({ _id: new ObjectId(newsId) });

        if (result.deletedCount === 0) {
            return res.status(404).json({ error: "News not found" });
        }

        res.json({ message: "News deleted successfully" });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Failed to delete news" });
    }
});

module.exports = router;
