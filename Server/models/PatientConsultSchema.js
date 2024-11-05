const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const PatientConsultSchema = new mongoose.Schema({
    patientId:{
        type:String,
        required:true
    },
    doctorId:{
        type:String,
        required:true
    },
    consult:[{
    supervisorId:{
        type:String,
        required:true
    },
    
    date:{
        type:Date,
        required:true
    },
    nextappointment:{
        type:Date
    },
    rating:{
        type:Number,
        required:true
    },
    description:{
        type:String,
        required:true
    },
    consultDoctor:{
        type:String
    }
    }]
});


const PatientConsult = mongoose.model('PatientConsult', PatientConsultSchema);

module.exports = PatientConsult;
