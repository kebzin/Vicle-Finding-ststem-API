const Wanted = require("../models/Wanted");
const officers = require("../models/officers");

// creating wanted
const CreatWanted = async (req, res) => {
  const id = req.params.id;
  const content = req.body;
  // const file = req.file;
  // console.log("file", file);
  // const buffer = file.buffer; // get the file buffer

  try {
    const Administrator = await officers.findById({ _id: id });
    if (Administrator.role == !"Administrator") {
      return res
        .status(404)
        .json({ message: "permission denied. Not authorze" });
    }

    const wanted = await Wanted.create({
      ...content, // Store the image as binary data
      officersid: id,
    });
    res.status(200).json({ message: "added wanted successfully  ", wanted });
  } catch (error) {
    console.log(error.message);
  }
};

// function to featch all the wanted
const getAllWanteds = async (req, res) => {
  try {
    const wanted = await Wanted.find().populate("officersid");

    // if (!wanted || wanted.length === 0) {
    //   return res.status(404).json([]);
    // }

    return res.status(200).json(wanted);
  } catch (error) {
    console.error("Error fetching wanted records:", error);
    return res
      .status(500)
      .json({ message: "An error occurred while fetching wanted records." });
  }
};

const fs = require("fs"); // Node.js file system module

const getSingleWanted = async (req, res) => {
  try {
    const wantedId = req.params.id; // Assuming the ID is passed in the URL parameters
    const wanted = await Wanted.findById(wantedId).populate("officersid");

    if (!wanted) {
      return res.status(404).json({ message: "Wanted record not found." });
    }

    return res.status(200).json(wanted);
  } catch (error) {
    console.error("Error fetching single wanted record:", error);
    return res.status(500).json({
      message: "An error occurred while fetching the single wanted record.",
    });
  }
};

const deleteWanted = async (req, res) => {
  try {
    const wantedId = req.params.id;
    const wanted = await Wanted.findById(wantedId);

    if (!wanted) {
      return res.status(404).json({ message: "Wanted record not found." });
    }

    // Delete the associated image file
    // const imageURIs = wanted.imageURi;
    // for (const imageURI of imageURIs) {
    //   const imagePath = path.join(
    //     __dirname,
    //     "../vench-finding-systeem/public/upload",
    //     "upload",
    //     imageURI
    //   ); // Adjust the path as needed
    //   fs.unlinkSync(imagePath); // Delete the image file
    // }
    // console.log(imageURIs);

    await Wanted.findByIdAndDelete(wantedId);

    return res.status(200).json({ message: "Wanted record deleted." });
  } catch (error) {
    console.error("Error deleting wanted record:", error);
    return res.status(500).json({
      message: "An error occurred while deleting the wanted record.",
    });
  }
};

const updateWanted = async (req, res) => {
  try {
    const wantedId = req.params.id; // Assuming the ID is passed in the URL parameters
    const updates = req.body; // Assuming the updates are sent in the request body
    const updatedWanted = await Wanted.findByIdAndUpdate(wantedId, updates, {
      new: true,
    });

    if (!updatedWanted) {
      return res.status(404).json({ message: "Wanted record not found." });
    }

    return res.status(200).json({ updatedWanted });
  } catch (error) {
    console.error("Error updating wanted record:", error);
    return res
      .status(500)
      .json({ message: "An error occurred while updating the wanted record." });
  }
};

module.exports = {
  CreatWanted,
  getAllWanteds,
  getSingleWanted,
  deleteWanted,
  updateWanted,
};
