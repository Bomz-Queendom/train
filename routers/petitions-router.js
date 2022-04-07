const express = require("express");
const { findPetitions, findPetitionsByVillagerId, addPetition, addPetitionByVillagerId, editPetitionByVillagerId } = require("./func/petitionFunc");
const router = express.Router();
const { body, validationResult, query, param } = require('express-validator');


router.get('/petitions-findAll', findPetitions);

router.get('/petitions-findPetitionsByVillagerId/:id', param("id").isMongoId(), findPetitionsByVillagerId);

router.post("/petitions-addByVillagerId/:id",
    param("id").isMongoId(),
    body("agent_id").isMongoId(),
    body("petition_type").isString(),
    body("problem_detail").isString(),
    body("image").isString(),
    body("need_corrective").isString(),
    body("status").isString(),
    body("create_date").isDate(),
    body("received_date").isDate(),
    body("end_date").isDate(),
    addPetitionByVillagerId
);

router.patch("/petitions-editPetitionByVillagerId/:id",
    param("id").isMongoId(),
    body("agent_id").isMongoId(),
    body("petition_type").isString(),
    body("problem_detail").isString(),
    body("image").isString(),
    body("need_corrective").isString(),
    body("status").isString(),
    body("create_date").isDate(),
    body("received_date").isDate(),
    body("end_date").isDate(),
    editPetitionByVillagerId
);

module.exports = router;