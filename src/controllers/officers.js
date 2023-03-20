const offesers = require("../models/officers");
const Fine = require("../models/fine");
const Transaction = require("../models/transaction");

// getting all the offesers
const getOffesers = async (req, res) => {
  try {
    const Officers = await offesers.find().lean().exec();
    if (!Officers) return "There is no offesers available";

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

// deleting officers
const deleteOffeser = async (req, res) => {
  const id = req.params.id;
  const content = req.body;
  try {
    const Offeser = await offesers.findByIdAndRemove({ _id: id }).exec();
    if (!Offeser) return res.status(400).json({ message: "user not found" });
    if (!Offeser._id === { officerId: content.officerId })
      return res
        .status(404)
        .json({ message: "you are not allowed authenticated to remove " });

    // deleting all the fine mader by an officers
    const Fines = await Fine.find({ officerId: content.officerId });
    if (Fines.length > 0) {
      Fines.forEach((fine) => {
        fine.remove();
      });
    }
    // delete deleting all transaction made by the user trnsaction
    const transactions = await Transaction.find({
      officerId: content.officerId,
    });
    if (transactions.length > 0) {
      transactions.forEach((transaction) => {
        transaction.remove();
      });
    }

    return res.status(200).json({
      message: "user deleted successfully",
      data: Offeser,
      transaction: "transaction deleted successfully",
      transactiondata: transactions,
      fine: "all fine delete successfully",
      finedata: Fines,
    });
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ message: error.message });
  }
};

// update user account
const updateOffeser = async (req, res) => {
  const content = req.body;
  try {
    const Offeser = await offesers
      .findByIdAndUpdate(content.OfficersId, ...content, { new: true })
      .exec();
    if (!Offeser) return res.status(400).json({ message: "user not found" });
    res.status(200).json({ message: "update successfully", data: Offeser });
  } catch (error) {
    console.log();
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getOffesers,
  getSingleOffeser,
  deleteOffeser,
  updateOffeser,
};

// fine user
