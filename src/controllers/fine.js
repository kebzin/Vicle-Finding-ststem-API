const Fines = require("../models/fine");
const Drivers = require("../models/drivers");
const officers = require("../models/officers");
const transaction = require("../models/transaction");
const dotenv = require("dotenv");

// cerating officer fine function
const Fine = async (request, response, next) => {
  const content = request.body;
  const id = request.params.id;

  console.log(content.officerId);

  try {
    const officersID = await officers.findById(content.officerId);
    if (!officersID) {
      return response.status(401).json({
        message: "user not found",
      });
    }

    // making fine
    const Fine = await Fines.create({
      officerId: content.officerId,
      ...content,
    });
    const drivers = await Drivers.create({
      FineID: (content.FineID = Fine._id),
      ...content,
    });
    const Trnsaction = await transaction.create({
      officerId: content.officerId,
      fineId: (content.fineId = Fine._id),
      ...content,
    });

    officersID.fines = officersID.fines.concat(Fine._id);
    officersID.transactions = officersID.transactions.concat(Trnsaction._id);
    officersID.save();

    return response
      .status(200)
      .json({ messsage: Fine, drivers: drivers, transactions: Trnsaction });
  } catch (error) {
    console.log(error);
    return response.status(500).json({
      message: error.message,
    });
  }
};

module.exports = { Fine };
