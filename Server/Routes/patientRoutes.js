const express = require('express');
const { registerPatient, loginPatient, therepistAssignView, therepistAllAssignView, therepistAssignSupervisor, ReceptionistView } = require('../Controller/patientAuth');
const router = express.Router();

router.post('/register', registerPatient);
router.post('/login', loginPatient);
router.post('/therepistview',therepistAssignView);
router.post('/therepistallview',therepistAllAssignView);
router.post('/therepistassignsupervisor',therepistAssignSupervisor);
router.post('/receptionistview',ReceptionistView);

module.exports = router;
