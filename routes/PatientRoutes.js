import router from './DoctorRoutes';
import PatientController from '../controllers/PatientController';

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
router.get('/patients', PatientController.getAllPatients);

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

router.get('/patients/:id', PatientController.getPatient);
router.put('/patients/:id', PatientController.updatePatient);
router.delete('/patients/:id', PatientController.deletePatient);

// Will be imported by SessionRoutes.js
export default router;
