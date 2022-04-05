const express = require("express");
const router = express.Router();
const Villagers = require('../models/villager');

router.get('/villagers-findAll', async (req, res) => {
    try {
        let data = await Villagers.find({});
        return res.json(data);
    }
    catch (error) {
        return res.status(500).json({ message: error.message });
    }
})

router.get('/villagers-findOne/:id', async (req, res) => {
    try {
        let data = await Villagers.findById(req.params.id);
        return res.json(data);
    }
    catch (error) {
        return res.status(500).json({ message: error.message });
    }
})

router.post("/villagers-add", async (req, res) => {
    let data = new Villagers(req.body);
    try {
        const dataToSave = await data.save();
        return res.status(200).json(data);
    }
    catch (error) {
        return res.status(400).json({ message: error.message });
    }
})

router.patch("/villagers-editOne/:id", async (req, res) => {
    try {
        const id = req.params.id;
        const updatedData = req.body;
        const options = { new: true };

        const result = await Villagers.findByIdAndUpdate(
            id, updatedData, options
        )

        return res.send(result);
    }
    catch (error) {
        return res.status(400).json({ message: error.message });
    }
})

router.delete("/villagers-deleteOne/:id", async (req, res) => {
    try {
        const id = req.params.id;
        const data = await Villagers.findByIdAndDelete(id)
        return res.send(`${data.first_name} has been deleted..`);
    }
    catch (error) {
        return res.status(400).json({ message: error.message });
    }
})

module.exports = router;