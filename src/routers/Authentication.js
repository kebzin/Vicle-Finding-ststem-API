const express = require("express");
const router = express.Router();

const {
  registerOfficer,
  login,
  logout,
  refresh,
  TellerLogin,
  Tellerrefresh,
} = require("../controllers/Autentication");
const verifyJWT = require("../middleware/verifyjwt");

// implementing the routh

router.post("/login", login);
router.post("/logout", logout);
router.get("/refresh", refresh);
router.post("/teller", TellerLogin);
router.get("/tellerrefresh", Tellerrefresh);

router.use(verifyJWT);
router.post("/register", registerOfficer);
module.exports = router;
