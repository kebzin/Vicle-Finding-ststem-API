const mongoose = require("mongoose");

const messageSchema = new mongoose.Schema({
  sendUser: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "user",
  },
});
