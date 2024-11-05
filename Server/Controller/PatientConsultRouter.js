const Patient = require('../models/PatientConsultSchema');


exports.registerPatientConsult = async (req, res) => {
    const {  patientId, doctorId, supervisorId, nextappointment, rating, description, consultDoctor } = req.body;
    const date = Date.now();
    const nextappointment1 = new Date(Date.parse(nextappointment));
    const consult = {supervisorId:supervisorId, date:date, nextappointment:nextappointment1, rating:rating, description:description, consultDoctor:consultDoctor};
    console.log(patientId, doctorId, supervisorId, nextappointment, rating, description, consultDoctor);

    try {
        const patient = await Patient.findOne({ patientId, doctorId });

        if (patient) {
            console.log(
                patient._id,
            patient.patientId,
            patient.consult,
            );
        } else {
            res.status(401).json({ message: 'Invalid Patient ID' });
        }
    } catch (error) {
        res.status(400).json({ message: error.message });
    }


    try {
        const InitialpatientConsult = await Patient.findOneAndUpdate({ patientId, doctorId },{$push:{consult:consult}},{new:true});
        console.log(InitialpatientConsult);
        res.status(201).json({
            patientId: InitialpatientConsult.patientId,
            doctorId:InitialpatientConsult.doctorId,
            consult:InitialpatientConsult.consult,
        });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

exports.getPatientConsult = async (req, res) => {

    const {patientId} = req.body;
    try {
        const patient = await Patient.findOne({ patientId });

        if (patient) {
            res.json({
                _id: patient._id,
                doctorId: patient.doctorId,
            patientId:patient.patientId,
            consult:patient.consult,
            });
        } else {
            res.status(401).json({ message: 'Invalid Patient ID' });
        }
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};