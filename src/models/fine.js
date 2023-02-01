const mongoose = require('mongoose');

const finedSchema = new mongoose.Schema({

});

finedSchema.set('toJSON', {
    transform: (document, returnedObject) => {
        returnedObject.id = returnedObject._id.toString();
        delete returnedObject._id;
        delete returnedObject.__v;
        return returnedObject;

    }
})