const express = require("express");
const { model } = require("mongoose");
const router = express.Router();
const verifyJWT = require("../middleware/verifyjwt");

const { Fine } = require("../controllers/fine");

router.use(verifyJWT);

router.post("/fine", Fine);

module.exports = router;
