const Villagers = require('../../models/villager');
const { validationResult } = require("express-validator");
const logger = require("../../logger");
const req = require('express/lib/request');

module.exports.findPetitions = async (req, res) => {
    let data = await Villagers.find();
    try {
        data.forEach(index => {
            if (index.petitions.length === 0) {
                logger.error("petitions is empty.");
                return res.status(404).json("petitions is empty.");
            }
            logger.info(index.petitions);
            return res.status(200).json(index.petitions);
        });
    }
    catch (error) {
        logger.error(error.message);
        return res.status(500).json({ message: error.message });
    }
}

module.exports.findPetitionsByVillagerId = async (req, res) => {
    try {
        const error = validationResult(req);
        if (!error.isEmpty()) {
            logger.error(error.array());
            return res.status(400).json({ error: error.array() });
        }
        let data = await Villagers.findById(req.params.id);
        if (!data) {
            logger.error(`villager id ${req.params.id} not found`);
            return res.status(404).json(`villager id ${req.params.id} not found`);
        }
        if (data.petitions.length === 0) {
            logger.error(`petitions villager id ${req.params.id} not found`);
            return res.status(404).json(`petitions villager id ${req.params.id} not found`);
        }
        logger.info(data.petitions);
        return res.status(200).json(data.petitions);
    }
    catch (error) {
        logger.error(error.message);
        return res.status(500).json({ message: error.message });
    }
}

module.exports.addPetitionByVillagerId = async (req, res) => {
    try {
        const error = validationResult(req);
        if (!error.isEmpty()) {
            logger.error(error.array());
            return res.status(400).json({ error: error.array() });
        }
        let dataInput = req.body;
        let data = await Villagers.findById(req.params.id);
        if (!data) {
            logger.error(`The villager id : ${req.params.id} were not found in the database.`);
            return res.status(404).json(`The villager id : ${req.params.id} were not found in the database.`);
        }
        await data.petitions.push(dataInput);
        await data.save();
        logger.info("add petition successfuly.");
        return res.status(200).json({ massage: "add petition successfuly." });
    } catch (error) {
        logger.error(error.massage);
        return res.status(400).json({ message: error.message });
    }
}

module.exports.editPetitionByVillagerId = async (req, res) => {
    try {
        const error = validationResult(req);
        if (!error.isEmpty()) {
            logger.error(error.array());
            return res.status(400).json({ error: error.array() });
        }
        let result = await Villagers.findOneAndUpdate()
    } catch (error) {

    }
}