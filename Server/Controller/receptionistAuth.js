const jwt = require('jsonwebtoken');
const Receptionist = require('../models/receptionistSchema.js');

const generateToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, {
        expiresIn: '1d',
    });
};

exports.registerReceptionist = async (req, res) => {
    const { name, receptionistId, password, phoneNumber } = req.body;

    try {
        const receptionist = await Receptionist.create({ name, receptionistId, password, phoneNumber });

        res.status(201).json({
            _id: receptionist._id,
            name: receptionist.name,
            receptionistId: receptionist.receptionistId,
            phoneNumber: receptionist.phoneNumber,
            token: generateToken(receptionist._id),
        });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

exports.loginReceptionist = async (req, res) => {
    const { receptionistId, password } = req.body;

    try {
        const receptionist = await Receptionist.findOne({ receptionistId });
        console.log(receptionist.name);

        if (receptionist && (await receptionist.matchPassword(password))) {
            res.json({
                _id: receptionist._id,
                receptionistId: receptionist.receptionistId,
                name:receptionist.name,
                token: generateToken(receptionist._id),
            });
        } else {
            res.status(401).json({ message: 'Invalid Receptionist ID' });
        }
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};