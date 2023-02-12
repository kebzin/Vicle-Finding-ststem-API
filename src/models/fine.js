const mongoose = require('mongoose');

const finedSchema = new mongoose.Schema({
    fineName:{type: 'string',},
    fineDescription:{type: 'string',},
    fineAmount:{type: Number},
    officerId:{type: mongoose.Schema.Types.ObjectId, ref: 'officers'},
    Longitude : {type: Number},
    Latitude : {type: Number},
    // bonuse : (fineAmount)=>{
    //     // calculate the bonus value of the fineAmount
        

    // }
    

},{timeseries: true});

finedSchema.set('toJSON', {
    transform: (document, returnedObject) => {
        returnedObject.id = returnedObject._id.toString();
        delete returnedObject._id;
        delete returnedObject.__v;
        return returnedObject;

    }
})

const Fine = mongoose.model('Fine', finedSchema)
module.exports = Fine