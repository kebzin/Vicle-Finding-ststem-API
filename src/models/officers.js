const mongoose = require("mongoose");

const OfficerSchema = new mongoose.Schema(
  {
    firstName: { type: String, require: true, default: "" },
    lastName: { type: String, require: true, default: "" },
    location: { type: String },
    PoliceStation: { type: String, require: true, default: "" },
    role: { type: String, require: true, default: "" },
    rank: { type: String, require: true, default: "" },
    PhoneNumber: { type: String, require: true, default: "" },
    status: { type: String, default: "Active" },
    password: { type: String, require: true, default: "" },
    email: { type: String, require: true, default: "" },
    BatchNumber: { type: String, require: true, default: "" },
    fines: [{ type: mongoose.Schema.Types.ObjectId, ref: "fines" }],
    transactions: [
      { type: mongoose.Schema.Types.ObjectId, ref: "transactions" },
    ],
  },
  { timestamps: true }
);

OfficerSchema.set("toJSON", {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
    return returnedObject;
  },
});
const offesers = mongoose.model("officers", OfficerSchema);

module.exports = offesers;
