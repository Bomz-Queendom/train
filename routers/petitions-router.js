const express = require("express");
const router = express.Router();
const Villagers = require('../models/villager');

router.get('/petitions-findAll/:id', async (req, res) => {
    let data = await Villagers.findById(req.params.id);
    try {
        res.json(data.petitions)
    }
    catch (error) {
        res.status(500).json({ message: error.message })
    }
})

router.post("/petitions-add/:id", async (req, res) => {
    let dataInput = req.body;
    let data = await Villagers.findById(req.params.id);
    try {

    } catch (error) {
        res.status(400).json({ message: error.message });
    }
})

module.exports = router;