const express = require("express");
const router = express.Router();

const {
  registerOfficer,
  login,
  logout,
  refresh,
} = require("../controllers/Autentication");

// implementing the routh
router.post("/register", registerOfficer);
router.post("/login", login);
router.post("/logout", logout);
router.get("/refresh", refresh);

module.exports = router;
