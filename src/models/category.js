const mongoose = require("mongoose");

const CategorySchema = new mongoose.Schema(
  {
    category: { type: "string", default: "", require: "true" },
    officerId: { type: mongoose.Schema.Types.ObjectId, ref: "officers" },
  },
  { timestamps: true }
);

//

CategorySchema.set("toJSON", {
  transform: (document, retornObject) => {
    retornObject.id = document._id.toString();
    delete retornObject._id;
    delete retornObject.__v;
    return retornObject;
  },
});
const Category = mongoose.model("category", CategorySchema);

module.exports = Category;
