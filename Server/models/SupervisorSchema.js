const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const SupervisorSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    supervisorId: {
        type: String,
        required: true,
        unique: true,
    },
    phoneNumber: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
});

SupervisorSchema.pre('save', async function (next) {
    if (!this.isModified('password')) {
        next();
    }
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
});

SupervisorSchema.methods.matchPassword = async function (enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password);
};

const Supervisor = mongoose.model('SupervisorData', SupervisorSchema);

module.exports = Supervisor;
