const Pricing = require("../models/pricing");
const offesers = require("../models/officers");
const { restart } = require("nodemon");

// adding price function
const AddPricing = async (req, res) => {
  const content = req.body;
  const id = req.params.id;
  const User = await offesers.findById(content.officerId);
  try {
    if (!User) {
      return res.status(404).json({ mesage: "user not found" });
    }
    if (User.status === "Employee" || User.status === "pending") {
      return res.status(404).json({
        mesage: "your must be an adminstrator to perform this operation",
      });
    }

    const pricing = await Pricing.create({
      OffenceName: content.OffenceName,
      OffencePrice: content.OffencePrice,
      OffenceCategory: content.OffenceCategory,
      AdminID: content.officerId,
    });
    return res
      .status(200)
      .json({ mesaage: "succesfully added", pricing: pricing });
  } catch (error) {}
};

//  get all the prices
const getAllPrices = async (req, res) => {
  try {
    const prices = await Pricing.find();
    res.json(prices);
  } catch (error) {
    console.error(error.message);
  }
};

// delete price funcion
const deletePrice = async (req, res) => {
  const content = req.body;
  const id = req.params.id;
  try {
    const AuthorizeUser = await offesers.findById(id).exec();
    if (!AuthorizeUser)
      return res.status(404).json({ message: "User not found" });
    if (AuthorizeUser.role !== "Administrator")
      return res.status(401).json({ message: "you are not authorized" });
    const DeletePrice = await Pricing.findByIdAndDelete({
      AdminID: content.AdminID,
    });
    res.status(200).json({ DeletePrice });
  } catch (error) {
    console.log(error.message);
    return res.status(404).json(error.message);
  }
};

module.exports = {
  AddPricing,
  getAllPrices,
  deletePrice,
};
