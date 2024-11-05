const express = require('express');
const { registerSupervisor, loginSupervisor, SupervisorMap } = require('../Controller/supervisorAuth');
const SupervisorRouter = express.Router();

SupervisorRouter.post('/register', registerSupervisor);
SupervisorRouter.post('/login', loginSupervisor);
SupervisorRouter.post('/supervisormap',SupervisorMap);

module.exports = SupervisorRouter;
