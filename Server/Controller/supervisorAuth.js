const jwt = require('jsonwebtoken');
const Supervisor = require('../models/SupervisorSchema');

const generateToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, {
        expiresIn: '1d',
    });
};

exports.registerSupervisor = async (req, res) => {
    const { name, supervisorId, phoneNumber, password } = req.body;

    try {
        const supervisor = await Supervisor.create({ name, supervisorId, phoneNumber, password });

        res.status(201).json({
            _id: supervisor._id,
            name: supervisor.name,
            supervisorId: supervisor.supervisorId,
            phoneNumber: supervisor.phoneNumber,
            token: generateToken(supervisor._id),
        });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

exports.loginSupervisor = async (req, res) => {
    const { supervisorId, password } = req.body;

    try {
        const supervisor = await Supervisor.findOne({ supervisorId });

        if (supervisor && (await supervisor.matchPassword(password))) {
            res.json({
                _id: supervisor._id,
                supervisorId: supervisor.supervisorId,
                name:supervisor.name,
                token: generateToken(supervisor._id),
            });
        } else {
            res.status(401).json({ message: 'Invalid Supervisor ID or Password' });
        }
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

exports.SupervisorMap = async (req, res) => {
    //const { supervisorId, password } = req.body;

    try {
        const supervisor = await Supervisor.find({});

        if (supervisor) {
            res.json(supervisor);
        } else {
            res.status(401).json({ message: 'Cannot find All supervisors' });
        }
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};
