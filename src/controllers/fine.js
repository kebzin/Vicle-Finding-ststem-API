const Fines = require("../models/fine");
const Bonus = require("../models/Bonus");
const officers = require("../models/officers");
const transaction = require("../models/transaction");
const tellerHistory = require("../models/TellerHistory");

// creating bonus
const AddBonus = async (req, res) => {
  const content = req.body;

  try {
    const bonus = await Bonus.create({ ...content });
    console.log(bonus);
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
};

const UpadteBunus = async (req, res) => {
  const id = req.params.id;
  const content = req.body;
  try {
    const UpdateItem = await Bonus.findById({ _id: id }).exec();
    if (!UpdateItem)
      return res.status(404).json({ message: "No Match found for id " + id });
    await Bonus.findByIdAndUpdate(
      { _id: id },
      {
        ...content,
      },
      { new: true }
    );

    res.status(200).json({ message: "Update successfully" });
  } catch (error) {
    console.log(error.message);
  }
};

const GetBonus = async () => {
  try {
    const data = await Bonus.find();
    if (!data) {
      return res.status(404).json({ message: "Bonus not found" });
    }
    return res.status(200).json(data);
  } catch (error) {}
};

// cerating officer fine function
const Fine = async (request, response) => {
  const content = request.body;
  const id = request.params.id;

  try {
    const officersID = await officers.findById({ _id: id });
    if (!officersID) {
      return response.status(401).json({
        message: "user not found",
      });
    }
    const bonus = await Bonus.find();

    const selecting = bonus[0].Bonus;
    const number = content.fineAmount;
    const Price = number.split(" ");
    const ActualPrice = Price[1];
    const passActualPriceToInterger = parseInt(ActualPrice);
    const amount = (passActualPriceToInterger * selecting) / 100;

    // making fine
    const Fine = await Fines.create({
      officerId: id,
      ...content,
      bonus: amount,
    });

    const Trnsaction = await transaction.create({
      officerId: id,
      fineId: (content.fineId = Fine._id),
      ...content,
    });

    officersID.fines = officersID.fines.concat(Fine._id);
    officersID.transactions = officersID.transactions.concat(Trnsaction._id);
    officersID.save();

    return response.status(200).json(Fine);
  } catch (error) {
    console.log(error);
    return response.status(500).json({
      message: error.message,
    });
  }
};

// get all the fines
const getAllFne = async (req, res) => {
  const content = await req.body;
  const id = req.params.id;

  const AllFine = await Fines.find().populate("officerId");
  if (AllFine.length === 0)
    return res.status(404).json({ message: "No fine avelable " });
  res.status(200).json(AllFine);
};

const getAllFineMyFine = async (req, res) => {
  const id = req.params.id;
  try {
    const fine = await Fines.find({ officerId: id }).populate("officerId");
    if (!fine) res.status(404).json({ message: "No fine found" });
    return res.status(200).json(fine);
  } catch (error) {
    console.log(error.message);
  }
};

const DeletingFine = async (req, res) => {
  const id = req.params.id;
  const content = req.body;

  try {
    // Find and delete the fine
    const fine = await Fines.findByIdAndDelete({ _id: id });
    if (!fine) {
      return res.status(404).json({
        message: "Didn't delete, because there was no matching fine found",
      });
    }

    // Find the officer to update the fines array
    const OFFICER = await officers.findById({ _id: content.officerId });

    // Find the index of the fine to be removed in the officer's fines array
    const fineIndex = OFFICER.fines.findIndex((officerFine) =>
      officerFine.equals(id)
    );
    console.log("fine index", fineIndex);

    if (fineIndex !== -1) {
      // Remove the fine from the officer's fines array
      OFFICER.fines.splice(fineIndex, 1);
      console.log("removed");

      // Save the updated officer data
      await OFFICER.save();
    }

    res.status(200).json({ message: "Fine deleted successfully" });
  } catch (error) {
    console.error(error.message);
    res
      .status(500)
      .json({ message: "An error occurred while deleting the fine." });
  }
};

//  get a single fine
const GetSingleFine = async (req, res) => {
  const id = req.params.id;
  try {
    const fine = await Fines.findById({ _id: id })
      .populate("officerId")
      .populate("tellerId");
    if (!fine)
      return res.status(404).json({
        message:
          "The request Id you passed in is not fount, This is usually because  the Id number you are comming with is invalid. Pleade check the Id number correctly and try again",
      });
    return res.status(200).json(fine);
  } catch (err) {
    console.log(err);
  }
};
// update  fine
const updateFine = async (req, res) => {
  const id = req.params.id;
  const content = req.body;
  try {
    const UpdateItem = await Fines.findById({ _id: id }).exec();
    if (!UpdateItem)
      return res.status(404).json({ message: "No Match found for id " + id });

    const UpdatePrice = await Fines.findByIdAndUpdate(
      { _id: id },
      {
        ...content,
      },
      { new: true }
    );

    // Update the tellerId array by concatenating the new tellerId value(s)
    UpdateItem.tellerId = UpdateItem.tellerId.concat(content.tellerId);

    // Save the updated fine object
    await UpdateItem.save();

    // Create a new entry in the tellerHistory collection
    const tellerHist = await tellerHistory.create({
      TellerID: content.tellerId, // Assuming content.tellerId is the ObjectId of the teller
      TransactionID: id,
      PaidAmount: content.PaidAmount,
    });
    UpdateItem.tellerId = UpdateItem.tellerId.concat(content.tellerId);
    await UpdateItem.save();

    res.status(200).json({ message: "Payment has been made successfully" });
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ message: "Internal server error" });
  }
};

// const history
const TellerHistory = async (req, res) => {
  try {
    const Histoey = await tellerHistory
      .find()
      .populate("TransactionID")
      .sort("-createdAt");
    res.send(Histoey);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

module.exports = {
  Fine,
  getAllFne,
  getAllFineMyFine,
  DeletingFine,
  GetSingleFine,
  updateFine,
  GetBonus,
  UpadteBunus,
  AddBonus,
};
