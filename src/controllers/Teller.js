const Tellers = require("../models/tellers");
const Officers = require("../models/officers");
const tellerHistory = require("../models/TellerHistory");
const { default: mongoose } = require("mongoose");
const bcrypt = require("bcrypt");
const CreateTeller = async (req, res) => {
  const content = req.body;

  try {
    // Check if the user making the request is authorized (Administrator or Sub Admin)
    // Find the officer by ID in the database
    const officers = await Officers.findOne({ Email: content.Email });
    if (!officers) {
      return res
        .status(404)
        .json({ message: "Officer not found to add  the tellers" });
    }
    const teller = await Tellers.findOne({ Email: content.Email }).exec();
    // Check if the teller with the given ID exists
    if (teller) {
      return res.status(404).json({ message: "Teller already   exist" });
    }

    // Check if the officer has the necessary role to add new  teller
    if (officers.role !== "Administrator" && officers.role !== "Sub Admin") {
      return res
        .status(403)
        .json({ message: "Unauthorized to add the tellers" });
    }
    // Find the teller by ID and update its details

    // Create the new teller using the content from the request body
    // hashing the password

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(content.password, salt);
    const NewTeller = await Tellers.create({
      ...content,
      password: hashedPassword,
    });

    res.status(201).json({ message: "Teller created successfully", NewTeller });
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ message: error.message });
  }
};

// getting all the offesers
/**
 * Retrieves a list of tellers who can handle payments at the bank.
 *
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @returns {Object} - The response containing the list of tellers or an error message.
 */
const GetTellers = async (req, res) => {
  try {
    const teller = await Tellers.find().lean().exec();
    if (teller.length === 0) {
      return res.status(404).json({ message: "No tellers available yet" });
    }

    // Respond with the list of tellers
    res.status(200).json(teller);
  } catch (error) {
    // Handle any unexpected errors
    console.error("Error in GetTellers:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// finding single teller
const getSingleOffeser = async (req, res) => {
  const id = req.params.id;
  try {
    const teller = await Tellers.findById({ _id: id }).exec();
    if (!teller) return "This  teller is not available";

    res.status(200).json(teller);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
};

// deleting officers and the assosiated with the
// Import required modules and models
// (Make sure to import the necessary modules and models)

const DeleteTeller = async (req, res) => {
  const id = req.params.id;

  try {
    // Find and delete the teller by ID
    const teller = await Tellers.findByIdAndRemove({ _id: id }).exec();

    // Check if the teller with the given ID exists
    if (!teller) {
      return res.status(404).json({ message: "Teller not found" });
    }

    // Successfully deleted the teller
    return res.status(200).json({
      message: "Teller deleted successfully",
    });
  } catch (error) {
    // Handle any errors that occur during the deletion process
    console.error("Error in DeleteTeller:", error.message);
    res.status(500).json({ message: "Internal server error" });
  }
};

const UpdateTeller = async (req, res) => {
  const id = req.params.id;
  const content = req.body;

  try {
    // Find the teller by ID and update its details
    const teller = await Tellers.findByIdAndUpdate(
      { _id: id },
      { ...content },
      {
        new: true,
      }
    ).exec();

    // Check if the teller with the given ID exists
    if (!teller) {
      return res.status(404).json({ message: "Teller not found" });
    }

    // Successfully updated the teller
    return res.status(200).json({
      message: "Teller updated successfully",
      teller: teller,
    });
  } catch (error) {
    // Handle any errors that occur during the update process
    console.error("Error in UpdateTeller:", error.message);
    res.status(500).json({ message: "Internal server error" });
  }
};

//  Teller history

// get the teller histoey and populate the transaction and the teller id
const GetTellerhistory = async (req, res) => {
  const id = req.params.id;
  try {
    // Convert the id string to an ObjectId
    const objectId = mongoose.Types.ObjectId(id);

    // Check if the teller exists
    const existTeller = await Tellers.findById({ _id: id });
    if (!existTeller) {
      return res.status(404).json({ message: "Teller not found" });
    }

    // Find the teller history using the correct field and the ObjectId
    const tellerHistor = await tellerHistory
      .find({ TellerID: objectId })
      .populate("TellerID")
      .populate("TransactionID");

    res.status(200).json(tellerHistor); // You might want to send the history in the response
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};
const GetHistory = async (req, res) => {
  try {
    // Convert the id string to an ObjectId

    // Find the teller history using the correct field and the ObjectId
    const tellerHistor = await tellerHistory
      .find()
      .populate("TellerID")
      .populate("TransactionID");

    res.status(200).json(tellerHistor); // You might want to send the history in the response
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

module.exports = {
  GetTellers,
  getSingleOffeser,
  DeleteTeller,
  UpdateTeller,
  CreateTeller,
  GetTellerhistory,
  GetHistory,
};

// fine user
