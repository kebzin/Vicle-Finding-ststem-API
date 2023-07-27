const Bank = require("../models/Banks");
const Bonus = require("../models/Bonus");
const offesers = require("../models/officers");

// adding category function
const AddBank = async (req, res) => {
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

    await Bank.create({
      ...content,
    });
    return res.status(200).json({ message: "succesfully added" });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      mesage: error?.message,
    });
  }
};

//  get all the category
const GetAllBank = async (req, res) => {
  try {
    const bank = await Bank.find();
    res.json(bank);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: error.message });
  }
};

// delete category funcion
const DeleteBank = async (req, res) => {
  const id = req.params.id;
  try {
    await Bank.findByIdAndDelete({ _id: id });
    res.status(200).json({ message: "Delete Succesfull" });
  } catch (error) {
    console.log(error.message);
    return res.status(404).json(error.message);
  }
};

// update category
// const updatecategory = async (req, res) => {
//   const content = req.body;
//   const id = req.params.id;
//   try {
//     const user = await offesers.findById({ _id: id });
//     if (!user) return res.status(404).json({ message: "User not found" });
//     category.findByIdAndUpdate({ _id: id }, ...content, { new: true }).exec();
//     res.status(200).json({ message: "update successfully" });
//   } catch (error) {
//     console.log();
//     res.status(500).json({ message: error.message });
//   }
// };

const GetBonus = async (req, res) => {
  try {
    const bonus = await Bonus.find();
    if (!bonus) {
      return res.status(404).json({ message: "bonus not found" });
    }
    res.json(bonus);
  } catch (error) {
    console.log(error);
  }
};
module.exports = {
  AddBank,
  GetAllBank,
  DeleteBank,
  GetBonus,
};
