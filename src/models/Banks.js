const mongoose = require("mongoose");

const BankSchema = new mongoose.Schema(
  {
    Bank: { type: "string", default: "", require: "true" },
    officerId: { type: mongoose.Schema.Types.ObjectId, ref: "officers" },
    Region: { type: "string", default: "", require: "true" },
  },
  { timestamps: true }
);

//

BankSchema.set("toJSON", {
  transform: (document, retornObject) => {
    retornObject.id = document._id.toString();
    delete retornObject._id;
    delete retornObject.__v;
    return retornObject;
  },
});
const Bank = mongoose.model("bank", BankSchema);

module.exports = Bank;
