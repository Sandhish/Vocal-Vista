const express = require('express');
const { registerReceptionist, loginReceptionist } = require('../Controller/receptionistAuth');
const ReceptionistRouter = express.Router();

ReceptionistRouter.post('/register', registerReceptionist);
ReceptionistRouter.post('/login', loginReceptionist);

module.exports = ReceptionistRouter;
