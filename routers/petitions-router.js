const express = require("express");
const router = express.Router();
const Villagers = require('../models/villager');

router.get('/petitions-findAll', async (req, res) => {
    let data = await Villagers.find();
    try {
        data.forEach(index => {
            return res.json(index.petitions);
        });
    }
    catch (error) {
        return res.status(500).json({ message: error.message });
    }
})

router.get('/petitions-villager-findAll/:id', async (req, res) => {
    let data = await Villagers.findById(req.params.id);
    try {
        return res.json(data.petitions);
    }
    catch (error) {
        return res.status(500).json({ message: error.message });
    }
})

router.post("/petitions-add/:id", async (req, res) => {
    let dataInput = req.body;
    let data = await Villagers.findById(req.params.id);
    try {
        await data.petitions.push(dataInput);
        await data.save();
        return res.status(200).json({massage : "add petition successfuly."});
    } catch (error) {
        return res.status(400).json({ message: error.message });
    }
})

module.exports = router;