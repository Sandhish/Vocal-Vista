const express = require('express');
const { registerPatientConsult, getPatientConsult } = require('../Controller/PatientConsultRouter');
const router = express.Router();

router.post('/updatepatient', registerPatientConsult);
router.post('/getpatient', getPatientConsult);

module.exports = router;