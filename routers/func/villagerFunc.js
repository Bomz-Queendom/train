const Villagers = require("../../models/villager");
const logger = require("../../logger");
const { validationResult } = require("express-validator");
module.exports.findVillagers = async (req, res) => {
    try {
        let data = await Villagers.find({});
        if (data.length === 0) {
            logger.error("Villagers collection is empty.");
            return res.status(404).json({ massage: "Villagers collection is empty." });
        }
        logger.info(data);
        return res.status(200).json(data);
    }
    catch (error) {
        logger.error(error.massage);
        return res.status(500).json({ message: error.message });
    }
}

module.exports.villagersFindByID = async (req, res) => {
    try {
        const error = validationResult(req);
        if (!error.isEmpty()) {
            logger.error(error.array());
            return res.status(400).json({ error: error.array() });
        }
        let data = await Villagers.findById(req.params.id);
        if (!data) {
            logger.error(`${req.params.id} not found.`);
            return res.status(404).json({ massage: `${req.params.id} not found.` });
        }
        logger.info(data);
        return res.status(200).json(data);
    }
    catch (error) {
        logger.error(error.massage);
        return res.status(500).json({ message: error.message });
    }
}

module.exports.villagersSearch = async (req, res) => {
    try {
        let data = await Villagers.find({});
        const searchText = req.query;
        const searchData = data.filter(user => {
            let isValid = true;
            for (key in searchText) {
                isValid = isValid && user[key] == searchText[key];
            }
            return isValid;
        });
        if (!searchData || searchData.length == 0) {
            logger.error(`${Object.values(searchText)} not found`);
            return res.status(404).json({ massage: `${Object.values(searchText)} not found` });
        }
        logger.info(searchData);
        return res.status(200).json(searchData);
    } catch (error) {
        logger.error(error.massage);
        return res.status(500).json({ message: error.message });
    }
}

module.exports.addVillagers = async (req, res) => {
    try {
        const error = validationResult(req);
        if (!error.isEmpty()) {
            logger.error(error.array());
            return res.status(400).json({ error: error.array() });
        }
        let data = new Villagers(req.body);
        const dataToSave = await data.save();
        logger.info(data);
        return res.status(200).json(data);
    }
    catch (error) {
        logger.error(error.massage);
        return res.status(400).json({ message: error.message });
    }
}

module.exports.villagerEdit = async (req, res) => {
    try {
        const error = validationResult(req);
        if (!error.isEmpty()) {
            logger.error(error.array());
            return res.status(400).json({ error: error.array() });
        }
        const id = req.params.id;
        const updatedData = req.body;
        const options = { new: true };

        const result = await Villagers.findByIdAndUpdate(
            id, updatedData, options
        );
        if (!result) {
            logger.error(`can't edit data id : ${id}`);
            return res.status(404).json({ message: `can't edit data id : ${id}` });
        }
        logger.info(`id : ${result.id} updated successfully.`);
        return res.status(200).json({ massage: `id : ${result.id} updated successfully.` });
    }
    catch (error) {
        logger.error(error.massage);
        return res.status(400).json({ message: error.message });
    }
}

module.exports.deleteVillager = async (req, res) => {
    try {
        const error = validationResult(req);
        if (!error.isEmpty()) {
            logger.error(error.array());
            return res.status(400).json({ error: error.array() });
        }
        const id = req.params.id;
        const data = await Villagers.findByIdAndDelete(id);
        if (!data) {
            logger.error("The data to be deleted does not exist in the database.");
            return res.status(404).json({ massage: "The data to be deleted does not exist in the database." });
        }
        logger.info(`${data.first_name} has been deleted..`);
        return res.send(`${data.first_name} has been deleted..`);
    }
    catch (error) {
        logger.error(error.massage);
        return res.status(400).json({ message: error.message });
    }
}