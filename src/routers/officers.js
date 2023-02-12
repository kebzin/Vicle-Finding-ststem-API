const express = require('express');
const router = express.Router();

// inporting function that will do the operation on the routh from the controller 
const {
    getOffesers,
    getSingleOffeser,
    deleteOffeser,
    updateOffeser
} = require('../controllers/officers')

router.get('/officers', getOffesers)
router.get('/officers/:id', getSingleOffeser)
router.delete('/deleteOfficers/:id', deleteOffeser)
router.put('/officers/:id', updateOffeser)

module.exports = router;