const jwt = require('jsonwebtoken');
const Patient = require('../models/patientSchema');
const InitialPatient = require('../models/InitialPatientSchema');

const generateToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, {
        expiresIn: '1d',
    });
};

exports.registerPatient = async (req, res) => {
    const { name, patientId, phoneNumber, doctorId, password } = req.body;
    const register = "0";

    try {
        const patient = await Patient.create({ name, patientId, phoneNumber, doctorId, password, register });

        res.status(201).json({
            _id: patient._id,
            name: patient.name,
            patientId: patient.patientId,
            doctorId: patient.doctorId,
            phoneNumber: patient.phoneNumber,
            register: patient.register,
            token: generateToken(patient._id),
        });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

exports.loginPatient = async (req, res) => {
    const { patientId, password } = req.body;

    try {
        const patient = await Patient.findOne({ patientId });

        if (patient && (await patient.matchPassword(password))) {
            res.json({
                _id: patient._id,
                patientId: patient.patientId,
                name:patient.name,
                doctorId:patient.doctorId,
                phoneNumber:patient.phoneNumber,
                register:patient.register,
                token: generateToken(patient._id),
            });
        } else {
            res.status(401).json({ message: 'Invalid Patient ID or Password' });
        }
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

exports.therepistAssignView = async(req, res) => {
    const {doctorId} = req.body;
    try{
        const patient = await Patient.find({ doctorId, register:"0" });

        if (patient) {
            res.json(patient);
        } else {
            res.status(401).json({ message: 'Invalid Doctor ID' });
        }
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
}

exports.therepistAllAssignView = async(req, res) => {
    const {doctorId} = req.body;
    try{
        const patient = await Patient.find({ doctorId });
        const initialpatient = await InitialPatient.find({doctorId});
        console.log(patient,initialpatient);
        if (patient) {
            res.json({patient:patient,initialpatient:initialpatient});
        } else {
            res.status(401).json({ message: 'Invalid Doctor ID' });
        }
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
}

exports.therepistAssignSupervisor = async(req, res) => {
    const {doctorId, patientId, supervisorId} = req.body;
    const register = "0",consulted="0";
    try{
        const patient = await Patient.findOneAndUpdate({ doctorId, patientId, register },{register:"1"},{new:true});
        const supervisor = await InitialPatient.findOneAndUpdate({doctorId, patientId, consulted},{supervisorId},{new:true});

        if (patient && supervisor) {
            res.json(patient);
        } else {
            res.status(401).json({ message: 'Invalid Doctor ID' });
        }
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
}

exports.ReceptionistView = async(req, res) => {
    //const {doctorId} = req.body;
    try{
        const patient = await Patient.find({});

        if (patient) {
            res.json(patient);
        } else {
            res.status(401).json({ message: 'Invalid Patient ID' });
        }
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
}