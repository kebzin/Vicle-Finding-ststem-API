const express = require('express');
const { model } = require('mongoose');
const router = express.Router();


const   {Fine}  = require('../controllers/fine')

router.post('/fine', Fine)




module.exports = router