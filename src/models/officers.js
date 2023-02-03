const mongoose = require('mongoose');

const OfficerSchema   = new mongoose.Schema({

    firstName: {type: String},
    lastName: {type: String},
    middleName: {type: String},
    dateOfBirth: {type: String},
    gender: {type: String},
    rank: {type: String},
    policeStation: {type: String},
    role: {type: String},
    phone: {type: String},
    email: {type: String},
    password: {type: String},
    fines: [{type: mongoose.Schema.Types.ObjectId, ref: 'fines'}],
    transactions: [{type: mongoose.Schema.Types.ObjectId, ref: 'transactions'}]

}, {timestamps: true })

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