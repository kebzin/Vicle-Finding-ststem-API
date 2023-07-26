const Tellers = require("../models/tellers");
const Officers = require("../models/officers");

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
    const NewTeller = await Tellers.create({ ...content });

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
    // Check if the request contains valid officer information
    // const content = req.body;
    // if (!content || !content.officers || !content.officers.id) {
    //   return res.status(400).json({ message: "Invalid officer information" });
    // }

    // Find the officer by ID in the database
    // const officers = await Officers.findById({ _id: content.officers.id });
    // if (!officers) {
    //   return res
    //     .status(404)
    //     .json({ message: "Officer not found to get all the tellers" });
    // }

    // // Check if the officer has the necessary role to access teller information
    // if (officers.role !== "Administrator" && officers.role !== "Sub Admin") {
    //   return res
    //     .status(403)
    //     .json({ message: "Unauthorized to get the tellers" });
    // }

    // Retrieve all tellers from the database
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
  console.log(content);
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

module.exports = {
  GetTellers,
  getSingleOffeser,
  DeleteTeller,
  UpdateTeller,
  CreateTeller,
};

// fine user
