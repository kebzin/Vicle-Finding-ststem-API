const mongoose = require("mongoose");

const BonusSchema = new mongoose.Schema(
  {
    Bonus: { type: Number, default: "", require: "true" },
    officerId: { type: mongoose.Schema.Types.ObjectId, ref: "officers" },
  },
  { timestamps: true }
);

//

BonusSchema.set("toJSON", {
  transform: (document, retornObject) => {
    retornObject.id = document._id.toString();
    delete retornObject._id;
    delete retornObject.__v;
    return retornObject;
  },
});
const Bonus = mongoose.model("Bonus", BonusSchema);

module.exports = Bonus;
