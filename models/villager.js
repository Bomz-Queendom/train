const mongoose = require("mongoose");
const Petitions = require("./petitions");

const villgerSchema = new mongoose.Schema({
  first_name: String,
  last_name: String,
  age: Number,
  gender: String,
  religion: String,
  ethnicity: String,
  nationalty: String,
  phone_num: String,
  date_of_birth: Date,
  idcart: String,
  email: String,
  address: {
    house_number: String,
    sub_district: String,
    district: String,
    province: String,
    postal_code: String
  },
  petitions: [Petitions]
})

const villagerModels = mongoose.model('villagers', villgerSchema);

module.exports = villagerModels;

