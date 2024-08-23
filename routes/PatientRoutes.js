import router from './DoctorRoutes';

import PatientController from '../controllers/PatientController';
import AuthenticationController from '../controllers/AuthenticationController';
import AuthMiddleware from '../middlewares/AuthMiddleware';

/**
 * @swagger
 * /patients:
 *   get:
 *     summary: Retrieve a list of all patients  - for dev.
 *     description: |
 *       Retrieves a list of all patients with optional pagination. This endpoint is restricted to users with the 'dev' role and requires authentication using a valid token in the `x-token` header.
 *
 *       **Authentication:**
 *       - Bearer Token via `x-token` header.
 *       - Requires a role of `dev`.
 *
 *       **Request Parameters:**
 *       - `x-token` (header, required): The authentication token.
 *       - `page` (header, optional): The page number for pagination.
 *       - `limit` (header, optional): Optional. The number of records per page.
 *
 *       **Response:**
 *       - A list of patients objects, each containing details such as `_id`, `firstName`, `lastName`, `email`, `doctor`, `medicalHistory`, and more.
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
 *           example: "eca7336d-7d3e-4123-9105-4b99f174d4c5"
 *       - name: page
 *         in: query
 *         description: The page number to retrieve (for pagination).
 *         required: false
 *         schema:
 *           type: integer
 *           example: 1
 *       - name: limit
 *         in: query
 *         description: The number of records to retrieve per page (for pagination).
 *         required: false
 *         schema:
 *           type: integer
 *           example: 10
 *     responses:
 *       200:
 *         description: Patient details retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   contact:
 *                     type: object
 *                     properties:
 *                       emergencyContact:
 *                         type: object
 *                         properties:
 *                           name:
 *                             type: string
 *                             example: "Jane Doe"
 *                           relationship:
 *                             type: string
 *                             example: "Sister"
 *                           phone:
 *                             type: string
 *                             example: "0987654321"
 *                       phone:
 *                         type: string
 *                         example: "1223367890"
 *                       address:
 *                         type: string
 *                         example: "4321 Elm Avenue"
 *                       city:
 *                         type: string
 *                         example: "Buffalo"
 *                       state:
 *                         type: string
 *                         example: "NY"
 *                   _id:
 *                     type: string
 *                     example: "66c6d13850a701dcd952a5d6"
 *                   firstName:
 *                     type: string
 *                     example: "Johnny"
 *                   lastName:
 *                     type: string
 *                     example: "SMITH"
 *                   gender:
 *                     type: string
 *                     example: "M"
 *                   bloodGroup:
 *                     type: string
 *                     example: "AB+"
 *                   height:
 *                     type: string
 *                     example: "178"
 *                   weight:
 *                     type: string
 *                     example: "73"
 *                   email:
 *                     type: string
 *                     example: "johnnysmith@example.com"
 *                   password:
 *                     type: string
 *                     example: "$2b$10$d.5gwKMN95RgNUxp5hNC9.fqziH9jOzart6hE1a.H/Azixh.cDQFS"
 *                   doctor:
 *                     type: string
 *                     example: "66c5c864a73c8c2f1cbad794"
 *                   sessions:
 *                     type: array
 *                     items:
 *                       type: string
 *                       example: "66bd759627dcebf1b674ec0f"
 *                   dob:
 *                     type: string
 *                     format: date
 *                     example: "1990-05-15"
 *                   medicalHistory:
 *                     type: array
 *                     items:
 *                       type: string
 *                       example: "Diabetes"
 *                   currentMedication:
 *                     type: array
 *                     items:
 *                       type: object
 *                       properties:
 *                         name:
 *                           type: string
 *                           example: "Insulin"
 *                         startDate:
 *                           type: string
 *                           format: date
 *                           example: "2024-01-01"
 *                         duration:
 *                           type: string
 *                           example: "6 months"
 *                         dosage:
 *                           type: string
 *                           example: "10 units"
 *                         description:
 *                           type: string
 *                           example: "For diabetes management"
 *                         endDate:
 *                           type: string
 *                           format: date-time
 *                           example: "2024-07-01T00:00:00.000Z"
 *                         _id:
 *                           type: string
 *                           example: "66c6ee48c5f7397a4d60897a"
 *                   familyHistory:
 *                     type: array
 *                     items:
 *                       type: object
 *                       properties:
 *                         medicalCondition:
 *                           type: string
 *                           example: "Heart disease"
 *                         relationship:
 *                           type: string
 *                           example: "Father"
 *                         description:
 *                           type: string
 *                           example: "Had a heart attack at age 60"
 *                         _id:
 *                           type: string
 *                           example: "66c6ee48c5f7397a4d60897b"
 *                   insurance:
 *                     type: string
 *                     example: "HealthPlus"
 *                   createdAt:
 *                     type: string
 *                     format: date-time
 *                     example: "2024-08-22T05:48:40.893Z"
 *                   updatedAt:
 *                     type: string
 *                     format: date-time
 *                     example: "2024-08-22T12:09:02.071Z"
 *                   age:
 *                     type: integer
 *                     example: 34
 *                   __v:
 *                     type: integer
 *                     example: 0
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
 *         description: Forbidden - Access restricted to 'dev' role
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Forbidden: Only users with 'dev' role can access this route."
 *       500:
 *         description: Internal Server Error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Internal server error"
 */
router.get('/patients', AuthMiddleware({ role: 'dev' }), PatientController.getAllPatients);

/**
 * @swagger
 * /patients:
 *   post:
 *     summary: Add a new patient to a doctor's patients - for doctor.
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
 *                       example: "6 months"
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
 *                         example: "6 months"
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
 *                   example: "Bad Request: Missing token"
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

/**
 * @swagger
 * /patients/connect:
 *   get:
 *     summary: Connect a patient and create a session token - for patient.
 *     description: |
 *       Authenticates a patient using Basic Auth credentials in the format `email:password`, where the credentials are base64 encoded. On successful authentication, a session token is generated and returned.
 *
 *       **Authentication:**
 *       - Basic Auth is required with credentials in the format `email:password` encoded in Base64.
 *
 *       **Request Headers:**
 *       - `Authorization` (header, required): Basic Authentication credentials encoded in Base64. Example: `Basic dXNlcjpzZWNyZXQxMjM=`
 *
 *       **Response:**
 *       - On success: Returns the session token for the authenticated patient.
 *       - On error: Provides details about missing credentials, invalid credentials, or server issues.
 *     tags:
 *       - Patients
 *     security:
 *       - basicAuth: []
 *     responses:
 *       '200':
 *         description: Successfully authenticated the patient and created a session token
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 token:
 *                   type: string
 *                   description: The session token for the authenticated patient
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
 *         description: Not Found - Patient not registered
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   description: Error message indicating the patient was not found
 *                   example: "Patient not found"
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
 */
router.get('/patients/connect', AuthenticationController.connectPatient);

/**
 * @swagger
 * /patients/disconnect:
 *   get:
 *     summary: Disconnect a patient by removing their session token - for patient.
 *     description: |
 *       Logs out a patient by deleting their session token from Redis, effectively ending their session. This endpoint requires the patient to be authenticated with a valid session token.
 *
 *       **Authentication:**
 *       - Token-based authentication is used, where the token should be passed in the `X-Token` header.
 *       - The `X-Token` value must be a valid session token issued during login.
 *       - Requires a role of `patient`.
 *
 *       **Request Parameters:**
 *       - `x-token` (header, required): The authentication token used for authorization.
 *
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
 *           example: "b14c9f0e-2a15-40f6-8187-f4c5ad4638c5"
 *     responses:
 *       '200':
 *         description: Successfully disconnected the patient
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: Success message indicating that the patient has been successfully disconnected
 *                   example: "Successfully disconnected"
 *       '400':
 *         description: Bad Request - Missing token
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   description: Error message indicating a missing or invalid token
 *                   example: "Bad Request: Missing token"
 *       '401':
 *         description: Unauthorized - Invalid or expired token
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   description: Error message indicating an invalid or expired token
 *                   example: "Unauthorized: Invalid or expired token"
 *       '500':
 *         description: Internal Server Error - Unexpected error during disconnection
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   description: Error message indicating an internal server error
 *                   example: "Internal Server Error: Unexpected error"
 */
router.get('/patients/disconnect', AuthMiddleware({ role: 'patient' }), AuthenticationController.disconnect);

/**
 * @swagger
 * /patients/{id}:
 *   get:
 *     summary: Retrieve a patient's own details - for patient.
 *     description: |
 *       Fetches the details of the authenticated patient by their ID. This endpoint requires the patient to be authenticated with a valid session token and must be performed by the patient who owns the profile.
 *
 *       **Authentication:**
 *       - Token-based authentication is required, where the `X-Token` header must contain a valid session token.
 *       - Requires a role of `patient`.
 *
 *       **Request Parameters:**
 *       - `x-token` (header, required): The authentication token used for authorization.
 *       - `id` (path, required): The unique identifier of the doctor.
 *
 *       **Response:**
 *       - On success: Returns the details of the authenticated patient, including fields such as `_id`, `firstName`, `lastName`, `email`, `contact`, `medicalHistory`, `familyHistory`, and more.
 *       - On error: Provides details about issues such as invalid token, patient not found, or server errors.
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
 *           example: "b14c9f0e-2a15-40f6-8187-f4c5ad4638c5"
 *       - name: id
 *         in: path
 *         description: The unique identifier of the patinet to retrieve.
 *         required: true
 *         schema:
 *           type: string
 *           example: "60c72b2f9b1e8a5e4c8b4567"
 *     responses:
 *       200:
 *         description: Patient details retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 contact:
 *                   type: object
 *                   properties:
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
 *                 _id:
 *                   type: string
 *                   example: "66c6d13850a701dcd952a5d6"
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
 *                   example: "AB+"
 *                 height:
 *                   type: string
 *                   example: "178"
 *                 weight:
 *                   type: string
 *                   example: "73"
 *                 email:
 *                   type: string
 *                   example: "johnnysmith@example.com"
 *                 password:
 *                   type: string
 *                   example: "$2b$10$d.5gwKMN95RgNUxp5hNC9.fqziH9jOzart6hE1a.H/Azixh.cDQFS"
 *                 doctor:
 *                   type: string
 *                   example: "66c5c864a73c8c2f1cbad794"
 *                 sessions:
 *                   type: array
 *                   items:
 *                     type: string
 *                     example: "66bd759627dcebf1b674ec0f"
 *                 dob:
 *                   type: string
 *                   format: date
 *                   example: "1990-05-15"
 *                 medicalHistory:
 *                   type: array
 *                   items:
 *                     type: string
 *                     example: "Diabetes"
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
 *                         format: date
 *                         example: "2024-01-01"
 *                       duration:
 *                         type: string
 *                         example: "6 months"
 *                       dosage:
 *                         type: string
 *                         example: "10 units"
 *                       description:
 *                         type: string
 *                         example: "For diabetes management"
 *                       endDate:
 *                         type: string
 *                         format: date-time
 *                         example: "2024-07-01T00:00:00.000Z"
 *                       _id:
 *                         type: string
 *                         example: "66c6ee48c5f7397a4d60897a"
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
 *                         example: "66c6ee48c5f7397a4d60897b"
 *                 insurance:
 *                   type: string
 *                   example: "HealthPlus"
 *                 createdAt:
 *                   type: string
 *                   format: date-time
 *                   example: "2024-08-22T05:48:40.893Z"
 *                 updatedAt:
 *                   type: string
 *                   format: date-time
 *                   example: "2024-08-22T12:09:02.071Z"
 *                 age:
 *                   type: integer
 *                   example: 34
 *                 __v:
 *                   type: integer
 *                   example: 6
 *
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
 *                   example: "Forbidden: Only patient can access this route. Please login as patient."
 *       404:
 *         description: Patient not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Patient not found"
 *       500:
 *         description: Internal Server Error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Internal server error"
 */
router.get('/patients/:id', AuthMiddleware({ role: 'patient' }), PatientController.getPatient);

/**
 * @swagger
 * /patients/{id}:
 *   patch:
 *     summary: Update a patient's password - for patient.
 *     description: |
 *       Updates the password for the authenticated patient. This endpoint requires authentication with a valid session token and must be performed by the patient who owns the profile. The new password must be confirmed by providing the same value in the `confirmPassword` field.
 *
 *       **Authentication:**
 *       - Token-based authentication is required, where the `X-Token` header must contain a valid session token.
 *       - Requires a role of `patient`.
 *
 *       **Request Parameters:**
 *       - `x-token` (header, required): The authentication token used for authorization.
 *       - `id` (path, required): The unique identifier of the patient to update.
 *
 *       **Request Body:**
 *       - Required fields: `password`, `confirmPassword`
 *       - Note: `password` must be confirmed by `confirmPassword` and meet strength criteria.
 *
 *       **Response:**
 *       - On success: Returns the updated details of the patient, including fields such as `_id`, `firstName`, `lastName`, `email`, and other relevant patient information.
 *       - On error: Provides details about validation issues, unauthorized access, or server errors.
 *     tags:
 *       - Patients
 *     parameters:
 *       - name: x-token
 *         in: header
 *         description: Token used for authentication.
 *         required: true
 *         schema:
 *           type: string
 *           example: "b14c9f0e-2a15-40f6-8187-f4c5ad4638c5"
 *       - name: id
 *         in: path
 *         description: The unique identifier of the patient to update.
 *         required: true
 *         schema:
 *           type: string
 *           example: "66c6d13850a701dcd952a5d6"
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               password:
 *                 type: string
 *                 example: "NewSecurePassword123!"
 *               confirmPassword:
 *                 type: string
 *                 example: "NewSecurePassword123!"
 *     responses:
 *       200:
 *         description: Patient password updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 _id:
 *                   type: string
 *                   description: The unique identifier of the patient.
 *                   example: "66c6d13850a701dcd952a5d6"
 *                 firstName:
 *                   type: string
 *                   example: "Johnny"
 *                 lastName:
 *                   type: string
 *                   example: "Smith"
 *                 email:
 *                   type: string
 *                   example: "johnnysmith@example.com"
 *                 contact:
 *                   type: object
 *                   properties:
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
 *                 gender:
 *                   type: string
 *                   example: "M"
 *                 bloodGroup:
 *                   type: string
 *                   example: "AB+"
 *                 height:
 *                   type: string
 *                   example: "178"
 *                 weight:
 *                   type: string
 *                   example: "73"
 *                 doctor:
 *                   type: string
 *                   example: "66c5c864a73c8c2f1cbad794"
 *                 sessions:
 *                   type: array
 *                   items:
 *                     type: string
 *                   example: [
 *                     "66bd759627dcebf1b674ec0f",
 *                     "66bd75df27dcebf1b674ec2d",
 *                     "66c7147f4cade6c9c617bc7f",
 *                     "66c715074cade6c9c617bc87",
 *                     "66c7150a4cade6c9c617bc8f",
 *                     "66c72a5dacb3da59eb2f98c0"
 *                   ]
 *                 dob:
 *                   type: string
 *                   example: "1990-05-15"
 *                 medicalHistory:
 *                   type: array
 *                   items:
 *                     type: string
 *                   example: [
 *                     "Diabetes",
 *                     "Hypertension"
 *                   ]
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
 *                         format: date
 *                         example: "2024-01-01"
 *                       duration:
 *                         type: string
 *                         example: "6 months"
 *                       dosage:
 *                         type: string
 *                         example: "10 units"
 *                       description:
 *                         type: string
 *                         example: "For diabetes management"
 *                       endDate:
 *                         type: string
 *                         format: date-time
 *                         example: "2024-07-01T00:00:00.000Z"
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
 *                 updatedAt:
 *                   type: string
 *                   format: date-time
 *                   example: "2024-08-22T12:09:02.071Z"
 *                 __v:
 *                   type: integer
 *                   example: 0
 *       400:
 *         description: Bad Request - Missing password, invalid request, or validation errors
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Password is required"
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
 *         description: Forbidden - User is not allowed to access this route
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Forbidden: You are not allowed to access this route."
 *       404:
 *         description: Patient not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Patient not found"
 *       500:
 *         description: Internal Server Error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Internal server error"
 */
router.patch('/patients/:id', AuthMiddleware({ role: 'patient' }), PatientController.updatePatient);

/**
 * @swagger
 * /patients/{id}:
 *   delete:
 *     summary: Deletes a patient record - for doctor.
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
 *                   example: "Forbidden: Only doctor can access this route. Please login as doctor."
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
