const mongoose = require("mongoose");

const finedSchema = new mongoose.Schema(
  {
    OffenceCommited: { type: String, default: "", require: true },
    fineDescription: { type: String, default: "", require: true },
    LicenNumber: { type: String, default: "", require: true },
    NumberPlat: { type: String, default: "", require: true },
    fineAmount: { type: String, default: "", require: true },
    officerId: { type: mongoose.Schema.Types.ObjectId, ref: "officers" },
    discription: { type: String, default: "", require: true },
    status: { type: String, default: "Pending" },
    wanted: { type: Boolean },
    category: { type: String, default: "", require: true },
    amountPaid: { type: Number, default: 0, require: true },
    bonus: { type: Number, default: 0, require },
    fineCategory: { type: String, default: "", require: true },
    tellerId: [{ type: mongoose.Schema.Types.ObjectId, ref: "Tellers" }],
    Location: { type: String, default: "", require: true },
    region: { type: String, default: "", require: true },
    Latitude: { type: Number, default: 0, require: true },
    Longititude: { type: Number, default: 0, require: true },

    // bonuse : (fineAmount)=>{
    //     // calculate the bonus value of the fineAmount

    // }
  },
  { timestamps: true }
);

finedSchema.set("toJSON", {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
    return returnedObject;
  },
});

const Fine = mongoose.model("Fine", finedSchema);
module.exports = Fine;
