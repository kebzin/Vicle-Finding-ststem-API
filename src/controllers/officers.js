const offesers = require("../models/officers");
const Fine = require("../models/fine");
const Transaction = require("../models/transaction");
const bcrypt = require("bcrypt");

// getting all the offesers
const getOffesers = async (req, res) => {
  try {
    const Officers = await offesers.find().lean().exec();
    if (!Officers) return "There is no officers available";
    const currentYear = new Date().getFullYear().toString();
    const currentMonth = (new Date().getMonth() + 1).toString();

    // Filter data to keep only objects created this month
    Officers.filter((obj) => {
      const createdAt = new Date(obj.createdAt);
      return (
        createdAt.getFullYear().toString() === currentYear &&
        (createdAt.getMonth() + 1).toString() === currentMonth
      );
    });

    res.status(200).json(Officers);
  } catch (error) {
    console.log();
    res.status(500).json({ message: error.message });
  }
};

// finding single user
const getSingleOffeser = async (req, res) => {
  const id = req.params.id;
  try {
    const Officer = await offesers.findById({ _id: id }).exec();
    if (!Officer) return "This  officers is not available";

    res.status(200).json(Officer);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
};

// deleting officers and the assosiated with the
const deleteOffeser = async (req, res) => {
  const id = req.params.id;
  const content = req.body;
  try {
    const officer = await offesers.findByIdAndRemove(id).exec();
    if (!officer) {
      return res.status(400).json({ message: "User not found" });
    }
    if (officer.officerId !== content.officerId) {
      return res
        .status(404)
        .json({ message: "You are not authorized to remove this officer" });
    }
    // Deleting all fines made by the officer
    await Fine.deleteMany({ officerId: content.officerId });
    // Deleting all transactions made by the officer
    await Transaction.deleteMany({ officerId: content.officerId });
    return res.status(200).json({
      message: "User deleted successfully",
    });
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ message: error.message });
  }
};

// update user account

const updateOffeser = async (req, res) => {
  const content = req.body;
  const id = req.params.id;

  try {
    const user = await offesers.findById({ _id: id });
    if (!user) return res.status(404).json({ message: "User not found" });
    if (content.password) {
      // If the request contains a new password, hash it before updating
      const hashedPassword = await bcrypt.hash(content.password, 10);
      content.password = hashedPassword;
    } else {
      // Remove the password field from content if it's empty
      delete content.password;
    }

    const updatedUser = await offesers
      .findByIdAndUpdate({ _id: id }, { ...content }, { new: true })
      .exec();
    res.status(200).json({ message: "Update successful" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "An error occurred while updating user." });
  }
};

module.exports = {
  getOffesers,
  getSingleOffeser,
  deleteOffeser,
  updateOffeser,
};

// fine user
