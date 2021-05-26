const mongoose = require("mongoose");
const leaveSchema = mongoose.Schema({
  leave_type: {
    type: String,
    enum: ["sick", "casual", "maternity"],
  },
  from: {
    type: Date,
  },
  to: {
    type: Date,
  },
  subject: {
    type: String,
  },
  days: {
    type: Number,
  },
  date_applied: {
    type: Date,
    default: Date.now(),
  },
  date_of_response: {
    type: Date,
  },
  department: {
    type: String,
    default: "COMP",
    enum: ["COMP", "ENTC", "IT"],
  },
  status: {
    type: String,
    enum: ["pending", "approved", "denied"],
    default: "pending",
  },
  professor_name: {
    type: String,
  },
  professor_id: {
    type: String,
  },
});
const Leave = mongoose.model("leave", leaveSchema);
module.exports = Leave;
