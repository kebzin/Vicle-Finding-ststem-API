
const  mongoose = require('mongoose');

const transportationSchema = new mongoose.Schema({

})


transportationSchema.set('toJSON', {
    transform: (document, returnedObject) => {
        returnedObject.id = returnedObject._id.toString();
        delete returnedObject._id;
        delete returnedObject.__v;
        return returnedObject;
    }
})