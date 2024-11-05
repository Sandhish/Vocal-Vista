const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const receptionistSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    receptionistId: {
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

receptionistSchema.pre('save', async function (next) {
    if (!this.isModified('password')) {
        next();
    }
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
});

receptionistSchema.methods.matchPassword = async function (enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password);
};

const Receptionist = mongoose.model('ReceptionistData', receptionistSchema);

module.exports = Receptionist;