const express = require("express");
const router = express.Router();
const Villagers = require('../models/villager');
const { body, validationResult } = require('express-validator');

router.get('/villagers-findAll', async (req, res) => {
    try {
        let data = await Villagers.find({});
        if (data.length === 0) {
            return res.status(404).json({ massage: "There is no data in the database." });
        }
        return res.status(200).json(data);
    }
    catch (error) {
        return res.status(500).json({ message: error.message });
    }
})

router.get('/villagers-findOne/:id', async (req, res) => {
    try {
        let data = await Villagers.findById(req.params.id);
        if (!data) {
            return res.status(404).json({ massage: "There is no data in the database." });
        }
        return res.status(200).json(data);
    }
    catch (error) {
        return res.status(500).json({ message: error.message });
    }
})

router.post("/villagers-add",
    body("first_name").isString(),
    body("last_name").isString(),
    body("age").isString(),
    body("gender").isString(),
    body("religion").isString(),
    body("ethnicity").isString(),
    body("nationalty").isString(),
    body("phone_num").isString(),
    body("date_of_birth").isDate(),
    body("idcart").isString().isLength({ min: 13 }),
    body("email").isEmail(),
    async (req, res) => {
        try {
            const error = validationResult(req);
            if (!error.isEmpty()) {
                return res.status(400).json({ error: error.array() });
            }
            let data = new Villagers(req.body);
            const dataToSave = await data.save();
            return res.status(200).json(data);
        }
        catch (error) {
            return res.status(400).json({ message: error.message });
        }
    })

router.patch("/villagers-editOne/:id",
    async (req, res) => {
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
        const data = await Villagers.findByIdAndDelete(id);
        if (!data) {
            return res.status(404).json({ massage: "The data to be deleted does not exist in the database." });
        }
        return res.send(`${data.first_name} has been deleted..`);
    }
    catch (error) {
        return res.status(400).json({ message: error.message });
    }
})

router.post("/address-add/:id",
    body("house_number").isString(),
    body("sub_district").isString(),
    body("district").isString(),
    body("province").isString(),
    body("postal_code").isString().isLength({ min: 5, max: 5 }),
    async (req, res) => {
        let dataInput = req.body;
        try {
            let data = await Villagers.findByIdAndUpdate(req.params.id, "address", { dataInput });
            await data.save();
            return res.status(200).json({ massage: "add petition successfuly." });
        } catch (error) {
            return res.status(400).json({ message: error.message });
        }
    }
)

module.exports = router;