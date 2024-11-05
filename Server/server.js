const express = require('express');
const dotenv = require('dotenv');
const connectDB = require('./db');
const router = require('./Routes/patientRoutes');
const cors = require('cors');
const SupervisorRouter = require('./Routes/supervisorRoutes');
const doctorRouter = require('./Routes/doctorRoutes');
const ReceptionistRouter = require('./Routes/receptionistRoutes');
const InitialPatientRegister = require('./Routes/InitialPatientRoutes');
const PatientConsult = require('./Routes/PatientConsultRoutes');

dotenv.config();
connectDB();

const app = express();

app.use(express.json());

app.use(cors());

app.use('/api/auth', router);

app.use('/doctor/auth', doctorRouter);

app.use('/supervisor/auth', SupervisorRouter);

app.use('/receptionist/auth', ReceptionistRouter);

app.use('/initial/auth', InitialPatientRegister);

app.use('/patient/auth',PatientConsult);

const PORT = 5000;

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
