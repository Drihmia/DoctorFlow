import { Router } from 'express';

import DoctorController from '../controllers/DoctorController';
import PatientController from '../controllers/PatientController';
import AuthenticationController from '../controllers/AuthenticationController';
import AuthMiddleware from '../middlewares/AuthMiddleware';

const router = Router();

/**
 * @swagger
 * tags:
 *   - name: Doctors
 *     description: Endpoints for managing doctor-related data. Includes functionality for retrieving, creating, updating, and deleting doctor records, as well as managing doctor sessions and patients associated with doctors.
 */

/**
 * @swagger
 * /doctors:
 *   get:
 *     summary: Retrieve a list of all doctors
 *     tags: [Doctors]
 *     responses:
 *       200:
 *         description: A JSON array of doctors' objects
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   _id:
 *                     type: string
 *                   firstName:
 *                     type: string
 *                   lastName:
 *                     type: string
 *                   email:
 *                     type: string
 *                     format: email
 *                   password:
 *                     type: string
 *                   gender:
 *                     type: string
 *                   specialization:
 *                     type: string
 *                   patients:
 *                     type: array
 *                     items:
 *                       type: string
 *                   appointments:
 *                     type: array
 *                     items:
 *                       type: string
 *                   dob:
 *                     type: string
 *                     format: date-time
 *                   createdAt:
 *                     type: string
 *                     format: date-time
 *                   updatedAt:
 *                     type: string
 *                     format: date-time
 *                   __v:
 *                     type: integer
 *       404:
 *         description: No doctors found
 *       500:
 *         description: Internal server error
 */
router.get('/doctors', AuthMiddleware({ role: 'dev' }), DoctorController.getAllDoctors);

/**
 * @swagger
 * /doctors:
 *   post:
 *     summary: Create a new doctor account
 *     description: This endpoint allows a new doctor to create an account by providing necessary details such as name, contact information, specialization, and more.
 *     tags:
 *       - Doctors
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               firstName:
 *                 type: string
 *                 example: "John"
 *                 description: "The first name of the doctor."
 *               lastName:
 *                 type: string
 *                 example: "Doe"
 *                 description: "The last name of the doctor. It will be stored in uppercase."
 *               email:
 *                 type: string
 *                 format: email
 *                 example: "johndoe@example.com"
 *                 description: "A unique email address for the doctor. Must be a valid email format."
 *               password:
 *                 type: string
 *                 format: password
 *                 example: "P@ssw0rd!"
 *                 description: "Password for the doctor's account. Must be at least 8 characters long."
 *               confirmPassword:
 *                 type: string
 *                 format: password
 *                 example: "P@ssw0rd!"
 *                 description: "Confirmation of the password. Must match the password."
 *               gender:
 *                 type: string
 *                 enum: ["M", "F"]
 *                 example: "M"
 *                 description: "The gender of the doctor. Must be either 'M' or 'F'."
 *               specialization:
 *                 type: string
 *                 example: "Cardiology"
 *                 description: "The doctor's area of specialization. Defaults to 'Generalist' if not provided."
 *               bio:
 *                 type: string
 *                 example: "Experienced cardiologist with over 10 years of practice."
 *                 description: "A short biography of the doctor."
 *               dob:
 *                 type: string
 *                 format: date
 *                 example: "1980-05-20"
 *                 description: "Date of birth of the doctor."
 *               phone:
 *                 type: string
 *                 example: "+1234567890"
 *                 description: "The doctor's phone number."
 *               address:
 *                 type: string
 *                 example: "123 Main St"
 *                 description: "Street address of the doctor's office."
 *               city:
 *                 type: string
 *                 example: "Springfield"
 *                 description: "City where the doctor is located."
 *               state:
 *                 type: string
 *                 example: "IL"
 *                 description: "State where the doctor is located."
 *             required:
 *               - firstName
 *               - lastName
 *               - email
 *               - password
 *               - confirmPassword
 *               - gender
 *     responses:
 *       201:
 *         description: Doctor account created successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: string
 *                   description: "The unique identifier of the newly created doctor."
 *                   example: "60c72b2f9b1e8a5e4c8b4567"
 *                 firstName:
 *                   type: string
 *                   example: "John"
 *                 lastName:
 *                   type: string
 *                   example: "DOE"
 *                 email:
 *                   type: string
 *                   example: "johndoe@example.com"
 *                 gender:
 *                   type: string
 *                   example: "M"
 *                 specialization:
 *                   type: string
 *                   example: "Cardiology"
 *                 bio:
 *                   type: string
 *                   example: "Experienced cardiologist with over 10 years of practice."
 *                 dob:
 *                   type: string
 *                   example: "1980-05-20"
 *                 phone:
 *                   type: string
 *                   example: "+1234567890"
 *                 contact:
 *                   type: object
 *                   properties:
 *                     address:
 *                       type: string
 *                       example: "123 Main St"
 *                     city:
 *                       type: string
 *                       example: "Springfield"
 *                     state:
 *                       type: string
 *                       example: "IL"
 *       400:
 *         description: Bad Request - Invalid input data
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: object
 *                   example:
 *                     email: "email already exists"
 *       500:
 *         description: Internal Server Error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Internal Server Error"
 */
router.post('/doctors', DoctorController.addDoctor);

/**
 * @swagger
 * /doctors/connect:
 *   get:
 *     summary: Connect a doctor and create a session token
 *     description: Authenticates a doctor using Basic Auth credentials and creates a session token if the authentication is successful.
 *     tags:
 *       - Doctors
 *     security:
 *       - basicAuth: []
 *     responses:
 *       '200':
 *         description: Successfully authenticated the doctor and created a session token
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 token:
 *                   type: string
 *                   description: The session token for the authenticated doctor
 *                   example: "84f86045-a8a6-4ef1-bbbd-b4c9c4796be7"
 *       '400':
 *         description: Bad Request - Missing email or password
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   description: Error message indicating missing email or password
 *                   example: "Bad Request: Missing email or password"
 *       '401':
 *         description: Unauthorized - Invalid credentials or wrong password
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   description: Error message indicating missing or invalid Authorization header, or wrong credentials or password
 *                   example: "Unauthorized: Missing or invalid Authorization header"
 *       '404':
 *         description: Not Found - Doctor not registered
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   description: Error message indicating the doctor was not found
 *                   example: "Doctor not found"
 *       '500':
 *         description: Internal Server Error - Unexpected error during authentication
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   description: Error message indicating an internal server error
 *                   example: "Internal Server Error"
 *     examples:
 *       curl:
 *         summary: Example of a curl command
 *         value: |
 *           curl -X 'GET' 'http://localhost:3000/doctors/connect' -H 'accept: application/json' -H 'Authorization: Basic ZHJvbW5pYUBnbWFpbC5jb206UEBzc3dvcmQx'
 */
router.get('/doctors/connect', AuthenticationController.connectDoctor);

/**
 * @swagger
 * /doctors/disconnect:
 *   get:
 *     summary: Disconnect a doctor by invalidating their token
 *     tags: [Doctors]
 *     parameters:
 *       - in: header
 *         name: x-token
 *         required: true
 *         schema:
 *           type: string
 *         description: |
 *           The token of the doctor to be disconnected
 *     responses:
 *       200:
 *         description: |
 *           Successfully disconnected the doctor
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
router.get('/doctors/disconnect', AuthMiddleware({ role: 'doctor' }), AuthenticationController.disconnectDoctor);


/**
 * @swagger
 * /doctors/{id}:
 *   get:
 *     summary: Retrieve a doctor's own details
 *     description: Fetches the authenticated doctor's by their ID. This endpoint requires authentication with a role of 'doctor'.
 *     tags:
 *       - Doctors
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         description: The unique identifier of the doctor to retrieve.
 *         required: true
 *         schema:
 *           type: string
 *           example: "60c72b2f9b1e8a5e4c8b4567"
 *       - name: x-token
 *         in: header
 *         description: Token used for authentication.
 *         required: true
 *         schema:
 *           type: string
 *           example: "your-authentication-token"
 *     responses:
 *       200:
 *         description: Doctor details retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: string
 *                   description: The unique identifier of the doctor.
 *                   example: "60c72b2f9b1e8a5e4c8b4567"
 *                 firstName:
 *                   type: string
 *                   example: "John"
 *                 lastName:
 *                   type: string
 *                   example: "DOE"
 *                 email:
 *                   type: string
 *                   example: "johndoe@example.com"
 *                 gender:
 *                   type: string
 *                   example: "M"
 *                 specialization:
 *                   type: string
 *                   example: "Cardiology"
 *                 bio:
 *                   type: string
 *                   example: "Experienced cardiologist with over 10 years of practice."
 *                 dob:
 *                   type: string
 *                   example: "1980-05-20"
 *                 phone:
 *                   type: string
 *                   example: "+1234567890"
 *                 contact:
 *                   type: object
 *                   properties:
 *                     address:
 *                       type: string
 *                       example: "123 Main St"
 *                     city:
 *                       type: string
 *                       example: "Springfield"
 *                     state:
 *                       type: string
 *                       example: "IL"
 *       400:
 *         description: Bad Request - Missing token or invalid request
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Bad Request: Missing token or invalid request"
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
 *         description: Doctor not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Doctor not found"
 *       500:
 *         description: Internal Server Error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "An unexpected error occurred."
 *     examples:
 *       application/json:
 *         summary: Example Request
 *         value: |
 *           curl -X 'GET' 'http://localhost:3000/doctors/66ba5199565d2c3eeda69687' -H 'accept: application/json' -H 'x-token: your-authentication-token'
 */
router.get('/doctors/:id', AuthMiddleware({ role: 'doctor' }), DoctorController.getDoctor);

/**
 * @swagger
 * /doctors/{id}:
 *   put:
 *     summary: Update a doctor's own details
 *     description: Updates the authenticated doctor's details. This endpoint requires authentication with a role of 'doctor'. Passwords must be confirmed if provided.
 *     tags:
 *       - Doctors
 *     parameters:
 *     security:
 *       - bearerAuth: []
 *       - name: id
 *         in: path
 *         description: The unique identifier of the doctor to update.
 *         required: true
 *         schema:
 *           type: string
 *           example: "60c72b2f9b1e8a5e4c8b4567"
 *       - name: x-token
 *         in: header
 *         description: Token used for authentication.
 *         required: true
 *         schema:
 *           type: string
 *           example: "your-authentication-token"
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               firstName:
 *                 type: string
 *                 example: "John"
 *               lastName:
 *                 type: string
 *                 example: "DOE"
 *               email:
 *                 type: string
 *                 example: "johndoe@example.com"
 *               password:
 *                 type: string
 *                 example: "newPassword123"
 *               confirmPassword:
 *                 type: string
 *                 example: "newPassword123"
 *               gender:
 *                 type: string
 *                 example: "M"
 *               specialization:
 *                 type: string
 *                 example: "Cardiology"
 *               bio:
 *                 type: string
 *                 example: "Experienced cardiologist with over 10 years of practice."
 *               dob:
 *                 type: string
 *                 example: "1980-05-20"
 *               phone:
 *                 type: string
 *                 example: "+1234567890"
 *               contact:
 *                 type: object
 *                 properties:
 *                   address:
 *                     type: string
 *                     example: "123 Main St"
 *                   city:
 *                     type: string
 *                     example: "Springfield"
 *                   state:
 *                     type: string
 *                     example: "IL"
 *     responses:
 *       200:
 *         description: Doctor details updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: string
 *                   description: The unique identifier of the doctor.
 *                   example: "60c72b2f9b1e8a5e4c8b4567"
 *                 firstName:
 *                   type: string
 *                   example: "John"
 *                 lastName:
 *                   type: string
 *                   example: "DOE"
 *                 email:
 *                   type: string
 *                   example: "johndoe@example.com"
 *                 gender:
 *                   type: string
 *                   example: "M"
 *                 specialization:
 *                   type: string
 *                   example: "Cardiology"
 *                 bio:
 *                   type: string
 *                   example: "Experienced cardiologist with over 10 years of practice."
 *                 dob:
 *                   type: string
 *                   example: "1980-05-20"
 *                 phone:
 *                   type: string
 *                   example: "+1234567890"
 *                 contact:
 *                   type: object
 *                   properties:
 *                     address:
 *                       type: string
 *                       example: "123 Main St"
 *                     city:
 *                       type: string
 *                       example: "Springfield"
 *                     state:
 *                       type: string
 *                       example: "IL"
 *       400:
 *         description: Bad Request - Missing ID, invalid request, or validation errors
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
 *         description: Doctor not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Doctor not found"
 *       500:
 *         description: Internal Server Error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "An unexpected error occurred."
 *     examples:
 *       application/json:
 *         summary: Example Request
 *         value: |
 *           curl -X 'PUT' 'http://localhost:3000/doctors/60c72b2f9b1e8a5e4c8b4567' -H 'accept: application/json' -H 'x-token: your-authentication-token' -d '{"firstName": "John", "lastName": "DOE", "email": "johndoe@example.com", "password": "newPassword123", "confirmPassword": "newPassword123"}'
 */
router.put('/doctors/:id', AuthMiddleware({ role: 'doctor' }), DoctorController.updateDoctor);

/**
 * @swagger
 * /doctors/{id}:
 *   delete:
 *     summary: Delete a doctor's own profile
 *     description: Deletes the authenticated doctor's profile. A doctor can only delete their own profile. This endpoint requires authentication with a role of 'doctor'.
 *     tags:
 *       - Doctors
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         description: The unique identifier of the doctor to delete.
 *         required: true
 *         schema:
 *           type: string
 *           example: "60c72b2f9b1e8a5e4c8b4567"
 *       - name: x-token
 *         in: header
 *         description: Token used for authentication.
 *         required: true
 *         schema:
 *           type: string
 *           example: "your-authentication-token"
 *     responses:
 *       200:
 *         description: Doctor deleted successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Doctor deleted"
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
 *         description: Doctor not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Doctor not found"
 *       500:
 *         description: Internal Server Error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "An unexpected error occurred."
 *     examples:
 *       application/json:
 *         summary: Example Request
 *         value: |
 *           curl -X 'DELETE' 'http://localhost:3000/doctors/60c72b2f9b1e8a5e4c8b4567' -H 'accept: application/json' -H 'x-token: your-authentication-token'
 */
router.delete('/doctors/:id', AuthMiddleware({ role: 'doctor' }), DoctorController.deleteDoctor);


router.delete('/doctors/:id/sessions/:sessionId', AuthMiddleware({ role: 'doctor' }), DoctorController.deleteDoctorSession);
router.get('/doctors/:id/sessions/', AuthMiddleware({ role: 'doctor' }), DoctorController.getDoctorSessions);
router.get('/doctors/:id/sessions/:sessionId', AuthMiddleware({ role: 'doctor' }), DoctorController.getDoctorSession);
// router.put('/doctors/:id/sessions/:sessionId', AuthMiddleware({ role: 'doctor' }), DoctorController.updateDoctorSession);


router.get('/doctors/:id/patients/', AuthMiddleware({ role: 'doctor' }), DoctorController.getDoctorPatients);
router.get('/doctors/:id/patients/:patientId', AuthMiddleware({ role: 'doctor' }), DoctorController.getDoctorPatient);
router.put('/doctors/:id/patients/:patientId', AuthMiddleware({ role: 'doctor' }), DoctorController.updateDoctorPatient);

// Will be imported by PatientRoutes.js
export default router;
