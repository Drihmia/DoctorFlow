import router from './DoctorRoutes';

import PatientController from '../controllers/PatientController';
import AuthenticationController from '../controllers/AuthenticationController';
import AuthMiddleware from '../middlewares/AuthMiddleware';


router.get('/patients', AuthMiddleware({ role: 'patient' }), PatientController.getAllPatients);

/**
 * @swagger
 * /patients:
 *   post:
 *     summary: Add a new patient to a doctor's patients
 *     description: |
 *       Adds a new patient to the system. This endpoint requires authentication with a valid session token and must be performed by an authenticated doctor.
 *       
 *       **Authentication:**
 *       - Token-based authentication is required, where the `X-Token` header must contain a valid session token.
 *       - Requires a role of `doctor`.
 *       
 *       **Request Body:**
 *       - Required fields: `firstName`, `lastName`,  `email`, `password`, `confirmPassword`, `gender`, `dob`, `Contact.phone`, `doctorId`.
 *       - Optional fields: `bloodGroup`, `height`, `weight`, `Contact`: (`address`, `city`, `state`), `emergencyContact`, `medicalHistory`, `currentMedication`, `familyHistory`, `insurance`.
 *       
 *       **Response:**
 *       - On success: Returns the details of the newly created patient, including fields such as `_id`, `firstName`, `lastName`, `gender`, `dob`, `email`, and more.
 *       - On error: Provides details about validation issues, unauthorized access, or server errors.
 *     tags:
 *       - Patients
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: x-token
 *         in: header
 *         description: Token used for authentication.
 *         required: true
 *         schema:
 *           type: string
 *           example: "doctor-authentication-token"
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               firstName:
 *                 type: string
 *                 example: "Johnny"
 *               lastName:
 *                 type: string
 *                 example: "Smith"
 *               gender:
 *                 type: string
 *                 example: "M"
 *               dob:
 *                 type: string
 *                 example: "1990-05-15"
 *               email:
 *                 type: string
 *                 example: "johnnysmith@example.com"
 *               password:
 *                 type: string
 *                 example: "secureP@ssw0rd"
 *               confirmPassword:
 *                 type: string
 *                 example: "secureP@ssw0rd"
 *               doctor:
 *                 type: string
 *                 example: "66c5c864a73c8c2f1cbad794"
 *               bloodGroup:
 *                 type: string
 *                 example: "O+"
 *               height:
 *                 type: string
 *                 example: "175"
 *               weight:
 *                 type: string
 *                 example: "70"
 *               contact:
 *                 type: object
 *                 properties:
 *                   phone:
 *                     type: string
 *                     example: "1223367890"
 *                   address:
 *                     type: string
 *                     example: "4321 Elm Avenue"
 *                   city:
 *                     type: string
 *                     example: "Buffalo"
 *                   state:
 *                     type: string
 *                     example: "NY"
 *                   emergencyContact:
 *                     type: object
 *                     properties:
 *                       name:
 *                         type: string
 *                         example: "Jane Doe"
 *                       relationship:
 *                         type: string
 *                         example: "Sister"
 *                       phone:
 *                         type: string
 *                         example: "0987654321"
 *               medicalHistory:
 *                 type: array
 *                 items:
 *                   type: string
 *                 example: ["Diabetes", "Hypertension"]
 *               currentMedication:
 *                 type: array
 *                 items:
 *                   type: object
 *                   properties:
 *                     name:
 *                       type: string
 *                       example: "Insulin"
 *                     startDate:
 *                       type: string
 *                       example: "2024-01-01"
 *                     duration:
 *                       type: string
 *                       example: "6"
 *                     dosage:
 *                       type: string
 *                       example: "10 units"
 *                     description:
 *                       type: string
 *                       example: "For diabetes management"
 *                     endDate:
 *                       type: string
 *                       example: "2024-07-01"
 *               familyHistory:
 *                 type: array
 *                 items:
 *                   type: object
 *                   properties:
 *                     medicalCondition:
 *                       type: string
 *                       example: "Heart disease"
 *                     relationship:
 *                       type: string
 *                       example: "Father"
 *                     description:
 *                       type: string
 *                       example: "Had a heart attack at age 60"
 *               insurance:
 *                 type: string
 *                 example: "HealthPlus"
 *     responses:
 *       201:
 *         description: Patient created successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 firstName:
 *                   type: string
 *                   example: "Johnny"
 *                 lastName:
 *                   type: string
 *                   example: "SMITH"
 *                 gender:
 *                   type: string
 *                   example: "M"
 *                 bloodGroup:
 *                   type: string
 *                   example: "O+"
 *                 height:
 *                   type: string
 *                   example: "175"
 *                 weight:
 *                   type: string
 *                   example: "70"
 *                 email:
 *                   type: string
 *                   example: "johnnysmith@example.com"
 *                 password:
 *                   type: string
 *                   example: "$2b$10$uac4af8ApINZECNONY7Gh.Ep2eKRQtX6Jq4zm04vGA0OeVjfxBWO2"
 *                 doctor:
 *                   type: string
 *                   example: "66c5c864a73c8c2f1cbad794"
 *                 sessions:
 *                   type: array
 *                   items:
 *                     type: string
 *                   example: []
 *                 contact:
 *                   type: object
 *                   properties:
 *                     phone:
 *                       type: string
 *                       example: "1223367890"
 *                     address:
 *                       type: string
 *                       example: "4321 Elm Avenue"
 *                     city:
 *                       type: string
 *                       example: "Buffalo"
 *                     state:
 *                       type: string
 *                       example: "NY"
 *                     emergencyContact:
 *                       type: object
 *                       properties:
 *                         name:
 *                           type: string
 *                           example: "Jane Doe"
 *                         relationship:
 *                           type: string
 *                           example: "Sister"
 *                         phone:
 *                           type: string
 *                           example: "0987654321"
 *                 dob:
 *                   type: string
 *                   example: "1990-05-15"
 *                 medicalHistory:
 *                   type: array
 *                   items:
 *                     type: string
 *                   example: ["Diabetes", "Hypertension"]
 *                 currentMedication:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       name:
 *                         type: string
 *                         example: "Insulin"
 *                       startDate:
 *                         type: string
 *                         example: "2024-01-01"
 *                       duration:
 *                         type: string
 *                         example: "6"
 *                       dosage:
 *                         type: string
 *                         example: "10 units"
 *                       description:
 *                         type: string
 *                         example: "For diabetes management"
 *                       endDate:
 *                         type: string
 *                         example: "2024-07-01T00:00:00.000Z"
 *                       _id:
 *                         type: string
 *                         example: "66c6d13850a701dcd952a5d7"
 *                 familyHistory:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       medicalCondition:
 *                         type: string
 *                         example: "Heart disease"
 *                       relationship:
 *                         type: string
 *                         example: "Father"
 *                       description:
 *                         type: string
 *                         example: "Had a heart attack at age 60"
 *                       _id:
 *                         type: string
 *                         example: "66c6d13850a701dcd952a5d8"
 *                 insurance:
 *                   type: string
 *                   example: "HealthPlus"
 *                 _id:
 *                   type: string
 *                   description: The unique identifier of the patient.
 *                   example: "66c6cf8fb5fb0ccefe9fb501"
 *                 createdAt:
 *                   type: string
 *                   format: date-time
 *                   example: "2024-08-22T05:41:35.066Z"
 *                 updatedAt:
 *                   type: string
 *                   format: date-time
 *                   example: "2024-08-22T05:41:35.201Z"
 *                 age:
 *                   type: integer
 *                   example: 34
 *                 __v:
 *                   type: integer
 *                   example: 0
 *       400:
 *         description: Bad Request - Missing required fields or validation errors
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Doctor not found"
 *       401:
 *         description: Unauthorized - Invalid or expired token
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Unauthorized: Invalid or expired token"
 *       403:
 *         description: Forbidden - Insufficient permissions to access this endpoint
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Forbidden: Only doctor can access this route. Please login as doctor."
 *       500:
 *         description: Internal Server Error - Error during processing
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Internal Server Error"
 */
router.post('/patients', AuthMiddleware({ role: 'doctor' }), PatientController.addPatient);
router.get('/patients/connect', AuthenticationController.connectPatient);
router.get('/patients/disconnect', AuthMiddleware({ role: 'patient' }), AuthenticationController.disconnectPatient);



router.get('/patients/:id', AuthMiddleware({ role: 'patient' }), PatientController.getPatient);
// Using updatePAtient for changing password by patient itself.
router.patch('/patients/:id', AuthMiddleware({ role: 'patient' }), PatientController.updatePatient); // selective data

/**
 * @swagger
 * /patients/{id}:
 *   delete:
 *     summary: Deletes a patient record.
 *     description: |
 *       Deletes a patient by their ID from the system. This endpoint requires authentication with a valid session token and must be performed by an authenticated doctor.
 *       
 *       **Authentication:**
 *       - Token-based authentication is required, where the `X-Token` header must contain a valid session token.
 *       - Requires a role of `doctor`.
 *       
 *       **Request Parameters:**
 *       - `id` (required): The unique identifier of the patient to be deleted.
 *       
 *       **Response:**
 *       - On success: Returns a success message indicating the patient was deleted.
 *       - On error: Provides details about unauthorized access, patient not found, or server errors.
 *     tags:
 *       - Patients
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: x-token
 *         in: header
 *         description: Token used for authentication.
 *         required: true
 *         schema:
 *           type: string
 *           example: "doctor-authentication-token"
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *           description: The ID of the patient to delete.
 *           example: "66c6fc10372e2c1d54da3418"
 *     responses:
 *       200:
 *         description: Patient successfully deleted.
 *         content:
 *           application/json:
 *             example:
 *               error: "Patient deleted"
 *       400:
 *         description: Bad Request - Missing ID or invalid request
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "id is required"
 *       401:
 *         description: Unauthorized - Invalid or expired token
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Unauthorized: Invalid or expired token"
 *       403:
 *         description: Forbidden
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Forbidden: Only doctor can access this route. Please login as doctor or contact your patient for help."
 *       404:
 *         description: Patient not found or doctor not authorized.
 *         content:
 *           application/json:
 *             example:
 *               error: "Patient not found"
 *       500:
 *         description: Server error.
 *         content:
 *           application/json:
 *             example:
 *               error: "Internal server error"
 */
router.delete('/patients/:id', AuthMiddleware({ role: 'doctor', extraLayer: false }), PatientController.deletePatient);

router.get('/patients/:id/sessions', AuthMiddleware({ role: 'patient' }), PatientController.getPatientSessions);
router.get('/patients/:id/sessions/:sessionId', AuthMiddleware({ role: 'patient' }), PatientController.getPatientSession);
router.get('/patients/:id/doctor', AuthMiddleware({ role: 'patient' }), PatientController.getPatientDoctor);



// Will be imported by SessionRoutes.js
export default router;
