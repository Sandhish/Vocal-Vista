const jwt = require('jsonwebtoken');
const Doctor = require('../models/DoctorSchema');

const generateToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, {
        expiresIn: '1d',
    });
};

exports.registerDoctor = async (req, res) => {
    const { name, doctorId, password, phoneNumber } = req.body;

    try {
        const doctor = await Doctor.create({ name, doctorId, password, phoneNumber });

        res.status(201).json({
            _id: doctor._id,
            name: doctor.name,
            doctorId: doctor.doctorId,
            phoneNumber: doctor.phoneNumber,
            token: generateToken(doctor._id),
        });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

exports.loginDoctor = async (req, res) => {
    const { doctorId, password } = req.body;

    try {
        const doctor = await Doctor.findOne({ doctorId });
        console.log(doctor.name);

        if (doctor && (await doctor.matchPassword(password))) {
            res.json({
                _id: doctor._id,
                doctorId: doctor.doctorId,
                name:doctor.name,
                token: generateToken(doctor._id),
            });
        } else {
            res.status(401).json({ message: 'Invalid Doctor ID or Password' });
        }
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};
