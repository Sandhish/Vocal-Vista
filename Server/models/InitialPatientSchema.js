const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const InitialPatientSchema = new mongoose.Schema({
    supervisorId:{
        type:String,
        required:true
    },
    patientId:{
        type:String,
        required:true
    },
    date:{
        type:Date,
        required:true
    },
    doctorId:{
        type:String,
        required:true
    },
    consulted:{
        type:String
    }
});


const InitialPatient = mongoose.model('InitialPatient', InitialPatientSchema);

module.exports = InitialPatient;
