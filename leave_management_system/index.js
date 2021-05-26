const mongoose = require("mongoose");
const express = require("express");
const HOD = require("./models/hod");
const Leave = require("./models/leave");
const Professor = require("./models/professor");
const path = require("path");
const methodOverride = require("method-override");
const app = express();
//================================================s
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride("_method"));
const { urlencoded } = require("express");
const { readSync } = require("fs");
const { brotliCompressSync } = require("zlib");
const { constants } = require("buffer");
app.use(express.static(path.join(__dirname, "public"))); // To Send Css Files

//================================================
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

mongoose.set("useFindAndModify", false);

//==================================================
app.get("/", (req, res) => {
  res.render("login", { error: "", uid: "", password: "", hod: "" });
});

app.post("/", async (req, res) => {
  const { uid, password, hod } = req.body;
  const error = validate(uid, password);
  // console.log(error);
  if (error === "") {
    if (hod == "on") {
      const prof = await HOD.findOne({ uid, password });
      if (prof) {
        res.redirect(`/hod/${prof.uid}`);
      } else {
        res.render("login", {
          error: "Invalid Credentials",
          uid,
          password,
          hod,
        });
      }
    } else {
      const prof = await Professor.findOne({ uid, password });
      if (prof) {
        res.redirect(`/professor/${prof.uid}`);
      } else {
        res.render("login", {
          error: "Invalid Credentials",
          uid,
          password,
          hod,
        });
      }
    }
  } else {
    res.render("login", { error, uid, password, hod });
  }
});

app.get("/hod/:id", async (req, res) => {
  const hod = await HOD.findOne({ uid: req.params.id });
  res.render("home", { prof: hod });
});

app.get("/professor/:id", async (req, res) => {
  const prof = await Professor.findOne({ uid: req.params.id });
  res.render("profHome", { prof });
});

app.get("/professor/:id/apply", async (req, res) => {
  const prof = await Professor.findOne({ uid: req.params.id });
  res.render("apply_leave", { prof });
});

app.get("/professor/:id/leave_status", async (req, res) => {
  const prof = await Professor.findOne({ uid: req.params.id });
  const leaves = await Leave.find({ professor_id: req.params.id }).sort({
    date_applied: -1,
  });
  res.render("leave_status", { prof, leaves });
});

app.post("/professor/:id/apply", async (req, res) => {
  const body = req.body;
  const date1 = new Date(body.to);
  const date2 = new Date(body.from);
  const days = 1 + (date1 - date2) / (1000 * 3600 * 24);
  const professor = await Professor.findOne({ uid: req.params.id });
  const data = await Leave.insertMany([
    {
      leave_type: body.leave_type,
      from: body.from,
      to: body.to,
      subject: body.subject,
      days: days,
      professor_id: professor.uid,
      department: professor.department,
      leave_type: body.type,
      professor_name: professor.fname + " " + professor.lname,
    },
  ]);
  res.redirect(`/professor/${req.params.id}/leave_status`);
});

app.get("/hod/:id/pending_leaves", async (req, res) => {
  const { id } = req.params;
  const hod = await HOD.findOne({ uid: id });
  const leaves = await Leave.find({
    department: hod.department,
    status: "pending",
  }).sort({
    date_applied: -1,
  });
  res.render("pending_leaves", { leaves, prof: hod });
});
app.get("/hod/:id/approved_leaves", async (req, res) => {
  const { id } = req.params;
  const hod = await HOD.findOne({ uid: id });
  const leaves = await Leave.find({
    department: hod.department,
    status: "approved",
  }).sort({
    date_of_response: -1,
  });
  res.render("approved_leaves", { leaves, prof: hod });
});
app.get("/hod/:id/denied_leaves", async (req, res) => {
  const { id } = req.params;
  const hod = await HOD.findOne({ uid: id });
  const leaves = await Leave.find({
    department: hod.department,
    status: "denied",
  }).sort({
    date_of_response: -1,
  });
  res.render("denied_leaves", { leaves, prof: hod });
});

app.put("/hod/:id/approve/:leave_id", async (req, res) => {
  const data = await Leave.findOneAndUpdate(
    { _id: req.params.leave_id },
    {
      status: "approved",
      date_of_response: Date.now(),
    },
    { upsert: true }
  );
  res.redirect(`/hod/${req.params.id}/pending_leaves`);
});
app.put("/hod/:id/deny/:leave_id", async (req, res) => {
  const data = await Leave.findOneAndUpdate(
    { _id: req.params.leave_id },
    {
      status: "denied",
      date_of_response: Date.now(),
    },
    { upsert: true }
  );
  res.redirect(`/hod/${req.params.id}/pending_leaves`);
});
//==================================================
app.listen(3000, () => {
  console.log("Server Running on port : 3000");
});

function validate(username, password) {
  if (username.length < 2) {
    return "Your username must be at least 8 characters";
  }
  if (username == null || username == "") {
    return "Please enter the username.";
  }
  if (password.length < 6) {
    return "Your password must be at least 8 characters";
  }
  if (password.search(/[a-z]/i) < 0) {
    return "Your password must contain at least one letter.";
  }
  if (password.search(/[0-9]/) < 0) {
    return "Your password must contain at least one digit.";
  }
  return "";
}
