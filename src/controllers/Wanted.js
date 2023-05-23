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
      name: content.name,
      gender: content.gender,
      crime: content.crime,
      height: content.height,
      location: content.location,
      location_commited: content.location_commited,
      status: content.status,
      description: content.description,
      age: content.age,
      color: content.color,
      image: content.image, // Store the image as binary data
      officersid: id,
    });
    res.status(200).json({ message: "added wanted successfully  " });
  } catch (error) {
    console.log(error.message);
  }
};

module.exports = {
  CreatWanted,
};
