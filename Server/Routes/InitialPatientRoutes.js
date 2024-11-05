const express = require('express');
const { registerInitialPatient, getInitialPatient, getAllInitialPatient } = require('../Controller/InitialPatientRouter');
const router = express.Router();

router.post('/registerinitial', registerInitialPatient);
router.post('/initialpatient', getInitialPatient);
router.post('/allinitialpatient',getAllInitialPatient);

module.exports = router;