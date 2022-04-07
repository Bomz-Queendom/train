const express = require("express");
const router = express.Router();
const { body, validationResult, query, param } = require('express-validator');
const { findVillagers, villagersFindByID, villagersSearch, addVillagers, deleteVillager, villagerEdit } = require("./func/villagerFunc");

router.get('/villagers-findAll', findVillagers);

router.get('/villagers-findById/:id', param("id").isMongoId(), villagersFindByID);

router.get("/villagers-search", villagersSearch);

router.post("/villagers-add",
    body("first_name").isString(),
    body("last_name").isString(),
    body("age").isInt(),
    body("gender").isString(),
    body("religion").isString(),
    body("ethnicity").isString(),
    body("nationalty").isString(),
    body("phone_num").isString(),
    body("date_of_birth").isDate(),
    body("idcart").isString().isLength({ min: 13 }),
    body("email").isEmail(),
    body("address.house_number").isString(),
    body("address.sub_district").isString(),
    body("address.district").isString(),
    body("address.province").isString(),
    body("address.postal_code").isString().isLength({ min: 5 }), addVillagers
)

router.patch("/villagers-edit/:id",
    param("id").isMongoId(),
    body("first_name").isString(),
    body("last_name").isString(),
    body("age").isInt(),
    body("gender").isString(),
    body("religion").isString(),
    body("ethnicity").isString(),
    body("nationalty").isString(),
    body("phone_num").isString(),
    body("date_of_birth").isDate(),
    body("idcart").isString().isLength({ min: 13 }),
    body("email").isEmail(),
    body("address.house_number").isString(),
    body("address.sub_district").isString(),
    body("address.district").isString(),
    body("address.province").isString(),
    body("address.postal_code").isString().isLength({ min: 5 }), 
    villagerEdit
);

router.delete("/villagers-deleteOne/:id", param("id").isMongoId(), deleteVillager);


module.exports = router;