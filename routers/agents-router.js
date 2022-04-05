const express = require("express");
const router = express.Router();
const Agents = require("../models/agent");

router.post("/agent-add", async (req, res) => {
    let data = new Agents(req.body);
    try {
        const dataToSave = await data.save();
        res.status(200).json(data)
    }
    catch (error) {
        res.status(400).json({ message: error.message })
    }
})

router.get("/agnet-findAll", async (req, res) => {
    try {
        let data = await Agents.find({});
        res.json(data)
    }
    catch (error) {
        res.status(500).json({ message: error.message })
    }
})

router.get('/agent-findOne/:id', async (req, res) => {
    try {
        let data = await Agents.findById(req.params.id);
        res.json(data)
    }
    catch (error) {
        res.status(500).json({ message: error.message })
    }
})

router.patch("/agent-editOne/:id", async (req, res) => {
    try {
        const id = req.params.id;
        const updatedData = req.body;
        const options = { new: true };

        const result = await Agents.findByIdAndUpdate(
            id, updatedData, options
        )

        res.send(result)
    }
    catch (error) {
        res.status(400).json({ message: error.message })
    }
})

router.delete("/agent-deleteOne/:id", async (req, res) => {
    try {
        const id = req.params.id;
        const data = await Agents.findByIdAndDelete(id)
        res.send(`${data.first_name} has been deleted..`)
    }
    catch (error) {
        res.status(400).json({ message: error.message })
    }
})

module.exports = router;