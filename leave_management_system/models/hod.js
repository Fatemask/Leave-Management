const mongoose = require("mongoose");
const HODSchema = mongoose.Schema({
  uid: {
    type: String,
    unique: true,
  },
  password: {
    type: String,
    default: "12345678",
  },
  fname: {
    type: String,
    default: "fname",
  },
  phone_number: {
    type: Number,
  },
  lname: {
    type: String,
    default: "lname",
  },
  department: {
    type: String,
    default: "COMP",
    enum: ["COMP", "ENTC", "IT"],
  },
  address: {
    type: String,
  },
  salary: {
    type: Number,
  },
  leaves: [
    {
      type: mongoose.Schema.Types.ObjectId,
    },
  ],
});

const HOD = mongoose.model("HOD", HODSchema);
module.exports = HOD;
