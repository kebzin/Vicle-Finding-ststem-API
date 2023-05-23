const mongoose = require("mongoose");

// schema
const WantedSchema = new mongoose.Schema(
  {
    name: { type: String },
    gender: { type: String },
    crime: { type: String },
    height: { type: String },
    location: { type: String },
    location_commited: { type: String, default: "" },
    status: { type: String, default: "Pending" },
    description: { type: String },
    age: { type: Number },
    color: { type: String },
    image: { type: String },
    officersid: { type: mongoose.Schema.Types.ObjectId, ref: "officers" },
  },
  { timestamps: true }
);

WantedSchema.set("toJSON", {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
    return returnedObject;
  },
});

const Wanted = mongoose.model(" Wanted", WantedSchema);
module.exports = Wanted;
