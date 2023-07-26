const PoliceStation = require("../models/PoliceStations");
const offesers = require("../models/officers");

// adding PoliceStation function
const AddPoliceStation = async (req, res) => {
  const content = req.body;
  console.log(content);
  const User = await offesers.findById(content.officerId);
  try {
    if (!User) {
      return res.status(404).json({ message: "user not found" });
    }
    if (User.status === "Employee" || User.status === "pending") {
      return res.status(404).json({
        message: "your must be an adminstrator to perform this operation",
      });
    }

    await PoliceStation.create({
      ...content,
    });
    return res.status(200).json({ message: "succesfully added" });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: error?.message,
    });
  }
};

//  get all the PoliceStations
const GetAllPoliceStation = async (req, res) => {
  try {
    const station = await PoliceStation.find();
    res.json(station);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: error.message });
  }
};

// delete category funcion
const DeletePoliceStation = async (req, res) => {
  const id = req.params.id;
  try {
    const station = await PoliceStation.findByIdAndDelete({ _id: id });
    if (!station)
      return res.status(404).json({
        message: "The police station you are trying to dekete is not found",
      });
    res.status(200).json({ message: "Delete Succesfull" });
  } catch (error) {
    console.log(error.message);
    return res.status(404).json(error.message);
  }
};

// update category
const UpadePoliceStation = async (req, res) => {
  const id = req.params.id;
  try {
    const user = await offesers.findById({ _id: id });
    if (!user) return res.status(404).json({ message: "User not found" });
    await PoliceStation.findByIdAndUpdate({ _id: id }, ...content, {
      new: true,
    }).exec();
    res.status(200).json({ message: "update successfully" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  AddPoliceStation,
  DeletePoliceStation,
  UpadePoliceStation,
  GetAllPoliceStation,
};
