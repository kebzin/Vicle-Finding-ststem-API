const mongoose = require("mongoose");

const TellerHistory = new mongoose.Schema(
  {
    TellerID: { type: mongoose.Schema.Types.ObjectId, ref: "Tellers" },
    TransactionID: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Fine",
    },
    PaidAmount: { type: String, require: true, default: "" },
  },
  { timestamps: true }
);

//

TellerHistory.set("toJSON", {
  transform: (document, retornObject) => {
    retornObject.id = document._id.toString();
    delete retornObject._id;
    delete retornObject.__v;
    return retornObject;
  },
});
const tellerHistory = mongoose.model("tellerHistory", TellerHistory);

module.exports = tellerHistory;
