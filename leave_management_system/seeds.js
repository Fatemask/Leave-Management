const mongoose = require("mongoose");
const Professor = require("./models/professor");
const HOD = require("./models/hod");
mongoose
  .connect("mongodb://localhost:27017/leave_management_system", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
  })
  .then(() =>
    console.log("Connection to DB leave_management_system successfull")
  )
  .catch((err) => console.log(err));
//==============================================

const professors = [
  {
    uid: "rohithreddy",
    password: "rohith@123",
    fname: "Rohith",
    lname: "Reddy",
    phone_number: 7588666666,
    department: "COMP",
    address: "Pune, Maharashtra",
    salary: 50000,
    leaves: [],
  },
  {
    uid: "rohanreddy",
    password: "rohan@123",
    fname: "Rohan",
    lname: "Reddy",
    phone_number: 7588886666,
    department: "COMP",
    address: "Pune, Maharashtra",
    salary: 40000,
    leaves: [],
  },
  {
    uid: "rahulreddy",
    password: "rahul@123",
    fname: "Rahul",
    lname: "Reddy",
    phone_number: 7888866666,
    department: "IT",
    address: "Pune, Maharashtra",
    salary: 30000,
    leaves: [],
  },
];

Professor.insertMany(professors)
  .then((data) => {
    console.log(data);
  })
  .catch((err) => console.log(err));
//============================================
const HODData = [
  {
    uid: "comp",
    password: "comp@123",
    fname: "comp",
    lname: "HOD",
    phone_number: 7888866666,
    department: "COMP",
    address: "Pune, Maharashtra",
    salary: 100000,
    leaves: [],
  },
  {
    uid: "it",
    password: "it@123",
    fname: "it",
    lname: "HOD",
    phone_number: 7888866666,
    department: "IT",
    address: "Pune, Maharashtra",
    salary: 100000,
    leaves: [],
  },
  {
    uid: "entc",
    password: "entc@123",
    fname: "entc",
    lname: "HOD",
    phone_number: 7888866666,
    department: "ENTC",
    address: "Pune, Maharashtra",
    salary: 100000,
    leaves: [],
  },
];
HOD.insertMany(HODData)
  .then((data) => {
    console.log(data);
  })
  .catch((err) => console.log(err));
