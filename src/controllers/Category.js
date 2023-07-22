const category = require("../models/category");
const offesers = require("../models/officers");

// adding category function
const Addcategory = async (req, res) => {
  const content = req.body;
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

    const Category = await category.create({
      ...content,
    });
    return res.status(200).json({ mesaage: "succesfully added" });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      mesage: error?.message,
    });
  }
};

//  get all the category
const getAllcategory = async (req, res) => {
  try {
    const category = await category.find();
    res.json(category);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: error.message });
  }
};

// delete category funcion
const deletecategory = async (req, res) => {
  const content = req.body;
  const id = req.params.id;
  try {
    const Deletecategory = await category.findByIdAndDelete({ _id: id });
    res.status(200).json({ message: "Delete Succesfull" });
  } catch (error) {
    console.log(error.message);
    return res.status(404).json(error.message);
  }
};

// update category
const updatecategory = async (req, res) => {
  const content = req.body;
  const id = req.params.id;
  try {
    const user = await offesers.findById({ _id: id });
    if (!user) return res.status(404).json({ message: "User not found" });
    category.findByIdAndUpdate({ _id: id }, ...content, { new: true }).exec();
    res.status(200).json({ message: "update successfully" });
  } catch (error) {
    console.log();
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  Addcategory,
  getAllcategory,
  deletecategory,
  updatecategory,
};
