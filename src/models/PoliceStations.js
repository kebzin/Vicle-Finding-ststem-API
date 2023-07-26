const mongoose = require("mongoose");

const policeStationSchema = new mongoose.Schema(
  {
    StationName: { type: "string", default: "", require: "true" },
    officerId: { type: mongoose.Schema.Types.ObjectId, ref: "officers" },
    Region: { type: "string", default: "", require: "true" },
  },
  { timestamps: true }
);

//

policeStationSchema.set("toJSON", {
  transform: (document, retornObject) => {
    retornObject.id = document._id.toString();
    delete retornObject._id;
    delete retornObject.__v;
    return retornObject;
  },
});
const policeStation = mongoose.model("Station", policeStationSchema);

module.exports = policeStation;
