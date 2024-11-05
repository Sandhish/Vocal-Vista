const Patient = require('../models/InitialPatientSchema');
const PatientConsult = require('../models/PatientConsultSchema');


exports.registerInitialPatient = async (req, res) => {
    const {  patientId, doctorId, supervisorId } = req.body;
    const date = Date.now();
    //date.setHours(23,59,59,999);
    const consulted = '0';

    try {
        const Initialpatient = await Patient.create({ supervisorId, patientId, date, doctorId, consulted });


    const consult = [];

        const InitialpatientConsult = await PatientConsult.create({ patientId, doctorId, consult });
    

        res.status(201).json({
            _id: Initialpatient._id,
            supervisorId: Initialpatient.supervisorId,
            patientId: Initialpatient.patientId,
            date: Initialpatient.date,
            doctorId: Initialpatient.doctorId,
            consulted: consulted,
            consult:InitialpatientConsult.consult,
        });
        console.log(patientId, date, doctorId, supervisorId);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

exports.getInitialPatient = async (req, res) => {

    const {supervisorId} = req.body;
    try {
        const patient = await Patient.find({ supervisorId,consulted:'0' });

        if (patient) {
            res.json(patient);
        } else {
            res.status(401).json({ message: 'Invalid Supervisor ID or Password' });
        }
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

exports.getAllInitialPatient = async (req, res) => {

    const {supervisorId} = req.body;
    try {
        const patient = await Patient.find({ supervisorId, consulted:'1' });

        if (patient) {
            res.json(patient);
        } else {
            res.status(401).json({ message: 'Invalid Supervisor ID or Password' });
        }
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};