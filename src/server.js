const express = require("express");
const connect = require("./connect/connect");
const app = express();
const Register = require("./routers/Authentication");
const Fine = require("./routers/fine");
const officers = require("./routers/officers");
const { Logger, LogEvent } = require("./middleware/logger");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const dotenv = require("dotenv").config();
const corssOption = require("./config/corsOption");
const Price = require("./routers/pricing");
const Driver = require("./routers/drivers");
const Message = require("./routers/Messsage");
const Category = require("./routers/Category");
const Teller = require("./routers/Teller");
const PoliceStation = require("./routers/PoliceStation");
// const path = require("path");

// middleware
app.use(Logger);
app.use(cors(corssOption));
app.use(express.json());
app.use(cookieParser());

// app.use(express.urlencoded({ extended: true }));
// // Serve static assets from the "build" folder (your React app build)
// // Serve static assets from the "build" folder (your React app build)
// app.use(express.static(path.join(__dirname, "vench-finding-systeem", "build")));

// // Define a catch-all route to serve the React app's main HTML file
// app.get("*", (req, res) => {
//   res.sendFile(
//     path.join(__dirname, "vench-finding-systeem", "build", "index.html")
//   );
// });

// routs
app.use("/api/price", Price);
app.use("/api/auth", Register);
app.use("/api/fine", Fine);
app.use("/api/officers", officers);
app.use("/api/driver", Driver);
app.use("/api/message", Message);
app.use("/api/category", Category);
app.use("/api/teller", Teller);
app.use("/api/station", PoliceStation);

// Connect to Database
void (async () => {
  // void function does not return any value , it mean that the function does cannot be stored in a variable
  try {
    await connect();
    console.log("connected to database"); // if connect is true then succesfully connected
  } catch (error) {
    console.log("error connecting to database:", error.message);
    LogEvent(
      `${error.on}: ${error.code}\t${error.syscall}\t${error.hostname}\t${error.status}`,
      "mongoErrLog.log"
    );
  }
})();

module.exports = app;
