const mongoose = require("mongoose");

const TellerSchema = new mongoose.Schema(
  {
    firstName: { type: String, require: true, default: "" },
    lastName: { type: String, require: true, default: "" },
    PhoneNumber: { type: String, require: true, default: "" },
    status: { type: String, default: "Active", require: true },
    password: { type: String, require: true, default: "" },
    Email: { type: String, require: true, default: "" },
    bankName: { type: String, require: true, default: "" },
    officerId: { type: mongoose.Schema.Types.ObjectId, ref: "officers" },
  },
  { timestamps: true }
);

TellerSchema.set("toJSON", {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
    return returnedObject;
  },
});
const Teller = mongoose.model("Tellers", TellerSchema);

module.exports = Teller;
