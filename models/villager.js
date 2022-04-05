const mongoose = require("mongoose");

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
  petitions: [
    {
      _id: mongoose.ObjectId,
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
    }
  ]
})

const villagerModels = mongoose.model('villagers', villgerSchema);

module.exports = villagerModels;

