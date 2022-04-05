const mongoose = require("mongoose");

const agentSchema = new mongoose.Schema({
    first_name: String,
    last_name: String,
    agent_pin: String,
    email: String,
    job_title: String,
    phone_num: String
})

const agentModels = mongoose.model("agents", agentSchema);
module.exports = agentModels;