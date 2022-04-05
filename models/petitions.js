const mongoose = require("mongoose");

const petitionsSchema = new mongoose.Schema({
    villager_id: mongoose.ObjectId,
    agent_id: mongoose.ObjectId,
    petition_type: String,
    problem_detail: String,
    scene: String,
    image: String,
    need_corrective: String,
    status: String,
    create_date: Date,
    received_date: Date,
    end_date: Date
})

module.exports = petitionsSchema;