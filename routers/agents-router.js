const express = require("express");
const router = express.Router();
const { body, validationResult, query, param } = require('express-validator');
const Agents = require("../models/agent");
const { addAgent, findAgentAll, findAgentById, editAgent, deleteAgent, agentSearch } = require("./func/agentFunc");

router.post("/agent-add",
    body("first_name").isString(),
    body("last_name").isString(),
    body("agent_pin").isString().isLength({ max: 6, min: 6 }),
    body("email").isEmail(),
    body("job_title").isString(),
    body("phone_num").isString().isLength({ max: 10, min: 10 }),
    addAgent
);

router.get("/agents-findAll", findAgentAll);

router.get('/agent-findById/:id', param("id").isMongoId(), findAgentById);

router.patch("/agent-editOne/:id",
    body("first_name").isString(),
    body("last_name").isString(),
    body("agent_pin").isString().isLength({ max: 7, min: 7 }),
    body("email").isEmail(),
    body("job_title").isString(),
    body("phone_num").isString().isLength({ max: 10, min: 10 }),
    editAgent
);

router.delete("/agent-deleteOne/:id", param("id").isMongoId(), deleteAgent);
router.get("/agents-search", agentSearch);

module.exports = router;