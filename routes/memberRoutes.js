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

// POST route to add a new member
router.post("/", async (req, res) => {
    try {
        const newMember = {
            member_name: req.body.mem_name,
            member_fname: req.body.mem_fname,
            member_top_cat: req.body.top_cat,
            member_sub_cat_1: req.body.sub_cat_1,
            member_sub_cat_2: req.body.sub_cat_2,
            member_sub_cat_3: req.body.sub_cat_3,
            member_sub_cat_4: req.body.sub_cat_4,
            member_email: req.body.mem_email,
            member_phone_number: req.body.mem_phone_number,
            member_district: req.body.mem_district,
            member_address: req.body.mem_address
        };
        const result = await req.db.collection("members").insertOne(newMember);
        res.status(201).json({ message: "Member added successfully", id: result.insertedId });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Could not add member" });
    }
});
// Update a member
router.put("/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const updatedMember = {
            member_name: req.body.member_name,
            member_fname: req.body.member_fname,
            member_top_cat: req.body.member_top_cat,
            member_sub_cat_1: req.body.member_sub_cat_1,
            member_sub_cat_2: req.body.member_sub_cat_2,
            member_sub_cat_3: req.body.member_sub_cat_3,
            member_sub_cat_4: req.body.member_sub_cat_4,
            member_email: req.body.member_email,
            member_phone_number: req.body.member_phone_number,
            member_district: req.body.member_district,
            member_address: req.body.member_address,
        };
        const result = await req.db.collection("members").updateOne(
            { _id: new req.db.bson.ObjectId(id) },
            { $set: updatedMember }
        );
        res.status(200).json({ message: "Member updated successfully" });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Could not update member" });
    }
});

// Delete a member
router.delete("/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const result = await req.db.collection("members").deleteOne({ _id: new req.db.bson.ObjectId(id) });
        res.status(200).json({ message: "Member deleted successfully" });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Could not delete member" });
    }
});


// GET all members
router.get("/all", async (req, res) => {
    try {
        const members = await req.db.collection("members").find().toArray();
        res.status(200).json(members);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Could not fetch members" });
    }
});

// === Hierarchical Cast API Endpoints ===

// Get main casts
router.get("/api/main-casts", async (req, res) => {
    try {
        const data = await req.db.collection("main_casts").find().toArray();
        res.json(data);
    } catch (error) {
        res.status(500).json({ error: "Failed to fetch main casts" });
    }
});

// Get sub_casts_1 based on main_cast_id
router.get("/api/sub-casts-1/:mainCastId", async (req, res) => {
    try {
        const data = await req.db.collection("sub_casts_1").find({ main_cast_id: req.params.mainCastId }).toArray();
        res.json(data);
    } catch (error) {
        res.status(500).json({ error: "Failed to fetch sub casts 1" });
    }
});

// Get sub_casts_2 based on main_cast_id and sub_cast_1_id
router.get("/api/sub-casts-2/:mainCastId/:subCast1Id", async (req, res) => {
    try {
        const data = await req.db.collection("sub_casts_2").find({
            main_cast_id: req.params.mainCastId,
            sub_cast_1_id: req.params.subCast1Id
        }).toArray();
        res.json(data);
    } catch (error) {
        res.status(500).json({ error: "Failed to fetch sub casts 2" });
    }
});

// Get sub_casts_3 based on main_cast_id, sub_cast_1_id, sub_cast_2_id
router.get("/api/sub-casts-3/:mainCastId/:subCast1Id/:subCast2Id", async (req, res) => {
    try {
        const data = await req.db.collection("sub_casts_3").find({
            main_cast_id: req.params.mainCastId,
            sub_cast_1_id: req.params.subCast1Id,
            sub_cast_2_id: req.params.subCast2Id
        }).toArray();
        res.json(data);
    } catch (error) {
        res.status(500).json({ error: "Failed to fetch sub casts 3" });
    }
});

// Get sub_casts_4 based on main_cast_id, sub_cast_1_id, sub_cast_2_id, sub_cast_3_id
router.get("/api/sub-casts-4/:mainCastId/:subCast1Id/:subCast2Id/:subCast3Id", async (req, res) => {
    try {
        const data = await req.db.collection("sub_casts_4").find({
            main_cast_id: req.params.mainCastId,
            sub_cast_1_id: req.params.subCast1Id,
            sub_cast_2_id: req.params.subCast2Id,
            sub_cast_3_id: req.params.subCast3Id
        }).toArray();
        res.json(data);
    } catch (error) {
        res.status(500).json({ error: "Failed to fetch sub casts 4" });
    }
});

module.exports = router;
