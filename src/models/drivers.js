const mongoose = require('mongoose');

const driversSchema  = new mongoose.Schema({
   
 


});

//

driversSchema.set('toJSON', {
    transform: (document, retornObject) => {
        retornObject.id = document._id.toString()
        delete retornObject._id
        delete retornObject.__v
        return retornObject
    }
    
})
const drivers = mongoose.model('drivers', driversSchema)

module.exports = drivers;