const mongoose = require('mongoose');

const OfficerSchema   = new mongoose.Schema({

})

OfficerSchema.set('toJSON',{
    transform: (document, returnedObject) => {
        returnedObject.id = returnedObject._id.toString();
        delete returnedObject._id;
        delete returnedObject.__v;
        return returnedObject;
    }
})
const offesers =  mongoose.model('officers', OfficerSchema )

module.exports = offesers