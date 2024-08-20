import router from './DoctorRoutes';

import PatientController from '../controllers/PatientController';
import AuthenticationController from '../controllers/AuthenticationController';
import AuthMiddleware from '../middlewares/AuthMiddleware';

/**
 * @swagger
 * tags:
 *   name: patients
 *   description: User management and authentication
 */

/**
 * @swagger
 * /patients:
 *   get:
 *     summary: Retrieve a list of all patients
 *     tags: [Patients]
 *     responses:
 *       200:
 *         description: A list of patients
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/models/patientModel.js'
 *       404:
 *         description: No patients found
 *       500:
 *         description: Internal server error
 */
router.get('/patients', AuthMiddleware({ role: 'patient' }), PatientController.getAllPatients);

/**
 * @swagger
 * /patients:
 *   post:
 *     summary: Create a new patient
 *     tags: [Patients]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Patient'
 *     responses:
 *       201:
 *         description: The created patient
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Patient'
 *       400:
 *         description: Invalid input, object invalid
 *       500:
 *         description: Internal server error
 */
router.post('/patients', PatientController.addPatient);

/**
 * @swagger
 * /patients/connect:
 *   get:
 *     summary: Authenticate a patient and generate a token
 *     tags: [Patients]
 *     security:
 *       - BasicAuth: []
 *     responses:
 *       200:
 *         description: Successfully authenticated patient and generated a token
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 token:
 *                   type: string
 *                   description: Authentication token for the patient
 *       400:
 *         description: |
 *           Bad Request: Missing email or password
 *       401:
 *         description: |
 *           Unauthorized: Missing or invalid Authorization header or wrong password
 *       404:
 *         description: |
 *           Not Found: Patient not found
 *       500:
 *         description: |
 *           Internal Server Error: Unexpected error during authentication
 */
router.get('/patients/connect', AuthenticationController.connectPatient);

/**
 * @swagger
 * /patients/disconnect:
 *   get:
 *     summary: Disconnect a patient by invalidating their token
 *     tags: [Patients]
 *     parameters:
 *       - in: header
 *         name: x-token
 *         required: true
 *         schema:
 *           type: string
 *         description: |
 *           The token of the patient to be disconnected
 *     responses:
 *       200:
 *         description: |
 *           Successfully disconnected the patient
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: Success message
 *       400:
 *         description: |
 *           Bad Request: Missing token
 *       401:
 *         description: |
 *           Unauthorized: Invalid or expired token
 *       500:
 *         description: |
 *           Internal Server Error
 */
router.get('/patients/disconnect', AuthMiddleware({ role: 'patient' }), AuthenticationController.disconnectPatient);

router.get('/patients/:id', AuthMiddleware({ role: 'patient' }), PatientController.getPatient);
// Using updatePAtient for changing password by patient itself.
router.patch('/patients/:id', AuthMiddleware({ role: 'patient' }), PatientController.updatePatient); // selective data
router.delete('/patients/:id', AuthMiddleware({ role: 'patient' }), PatientController.deletePatient);

router.get('/patients/:id/sessions', AuthMiddleware({ role: 'patient' }), PatientController.getPatientSessions);
router.get('/patients/:id/sessions/:sessionId', AuthMiddleware({ role: 'patient' }), PatientController.getPatientSession);
router.get('/patients/:id/doctor', AuthMiddleware({ role: 'patient' }), PatientController.getPatientDoctor);

// Will be imported by SessionRoutes.js
export default router;
