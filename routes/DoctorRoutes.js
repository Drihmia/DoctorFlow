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
 *     summary: Retrieve a list of all doctors (restricted to 'dev' role)
 *     description: |
 *       Retrieves a list of all doctors with optional pagination. This endpoint is restricted to users with the 'dev' role and requires authentication using a valid token in the `x-token` header.
 *       
 *       **Authentication:**
 *       - Bearer Token via `x-token` header.
 *       - Requires a role of `dev`.
 * 
 *       **Parameters:**
 *       - `page`: Optional. The page number for pagination.
 *       - `limit`: Optional. The number of records per page.
 *       - `x-token`: Required. The authentication token.
 *
 *       **Response:**
 *       - A list of doctor objects, each containing details such as `_id`, `firstName`, `lastName`, `email`, `gender`, `specialization`, and more.
 *     tags:
 *       - Doctors
 *     security:
 *       - bearerAuth: []
 *     parameters:
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
 *       - name: x-token
 *         in: header
 *         description: Token used for authentication.
 *         required: true
 *         schema:
 *           type: string
 *           example: "your-authentication-token"
 *     responses:
 *       200:
 *         description: A list of doctors retrieved successfully.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   _id:
 *                     type: string
 *                     example: "66c5c864a73c8c2f1cbad794"
 *                   firstName:
 *                     type: string
 *                     example: "John"
 *                   lastName:
 *                     type: string
 *                     example: "Doe"
 *                   email:
 *                     type: string
 *                     example: "johndoe@example.com"
 *                   password:
 *                     type: string
 *                     example: "$2b$10$tD12oUKX6xnnIXfVzbFtOu00EN/VTdtWY5wIGOBkqfAYZ3wUkrGYy"
 *                   gender:
 *                     type: string
 *                     example: "M"
 *                   specialization:
 *                     type: string
 *                     example: "Cardiology"
 *                   patients:
 *                     type: array
 *                     items:
 *                       type: string
 *                     example: []
 *                   sessions:
 *                     type: array
 *                     items:
 *                       type: string
 *                     example: []
 *                   bio:
 *                     type: string
 *                     example: "Experienced cardiologist with over 10 years of practice."
 *                   phone:
 *                     type: string
 *                     example: "1234567890"
 *                   dob:
 *                     type: string
 *                     example: "1980-05-20"
 *                   createdAt:
 *                     type: string
 *                     format: date-time
 *                     example: "2024-08-21T10:58:44.532+00:00"
 *                   updatedAt:
 *                     type: string
 *                     format: date-time
 *                     example: "2024-08-21T11:36:03.155+00:00"
 *                   __v:
 *                     type: integer
 *                     example: 0
 *       400:
 *         description: Bad Request - Invalid parameters
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Invalid page or limit parameter"
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
 *                   example: "An unexpected error occurred."
 */
router.get('/doctors', AuthMiddleware({ role: 'dev' }), DoctorController.getAllDoctors);



/**
 * @swagger
 * /doctors:
 *   post:
 *     summary: Create a new doctor account
 *     description: |
 *       Creates a new doctor account with the provided details.
 *       
 *       **Authentication:**
 *       - No authentication required.
 *       
 *       **Request Body:**
 *       - Required fields: `firstName`, `lastName`, `email`, `password` (must be at least 8 characters long, including 1 uppercase letter, 1 lowercase letter, 1 number, and 1 symbol), `confirmPassword` (must match `password`), `gender`, `dob`.
 *       - Optional fields: `specialization`, `bio`, `phone`, `address`, `city`, `state`.
 *       
 *       **Response:**
 *       - On success: Returns the unique identifier and details of the newly created doctor.
 *       - On error: Provides details about validation issues or server errors.
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
 *               - dob
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
 *                   example: "66c5c864a73c8c2f1cbad794"
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
 *                   example: "1234567890"
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
 *     description: |
 *       Authenticates a doctor using Basic Auth credentials in the format `email:password`, where the credentials are base64 encoded. On successful authentication, a session token is generated and returned.
 *       
 *       **Authentication:**
 *       - Basic Auth is required with credentials in the format `email:password` encoded in Base64.
 *       
 *       **Response:**
 *       - On success: Returns the session token for the authenticated doctor.
 *       - On error: Provides details about missing credentials, invalid credentials, or server issues.
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
 *     summary: Disconnect a doctor by removing their session token
 *     description: |
 *       Logs out a doctor by deleting their session token from Redis, effectively ending their session. This endpoint requires the doctor to be authenticated with a valid session token.
 *       
 *       **Authentication:**
 *       - Token-based authentication is used, where the token should be passed in the `X-Token` header.
 *       - The `X-Token` value must be a valid session token issued during login.
 *       - Requires a role of `doctor`.
 *     tags:
 *       - Doctors
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: x-token
 *         in: header
 *         description: Token used for authentication.
 *         required: true
 *         schema:
 *           type: string
 *           example: "your-authentication-token"
 *     responses:
 *       '200':
 *         description: Successfully disconnected the doctor
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: Success message indicating that the doctor has been successfully disconnected
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
 *     examples:
 *       curl:
 *         summary: Example of a curl command
 *         value: |
 *           curl -X 'GET' 'http://localhost:3000/doctors/disconnect' -H 'accept: application/json' -H 'Authorization: Bearer your_token_here'
 */
router.get('/doctors/disconnect', AuthMiddleware({ role: 'doctor' }), AuthenticationController.disconnectDoctor);



/**
 * @swagger
 * /doctors/{id}:
 *   get:
 *     summary: Retrieve a doctor's own details
 *     description: |
 *       Fetches the details of the authenticated doctor by their ID. This endpoint requires the doctor to be authenticated with a valid session token and must be performed by the doctor who owns the profile.
 *       
 *       **Authentication:**
 *       - Token-based authentication is required, where the `X-Token` header must contain a valid session token.
 *       - Requires a role of `doctor`.
 *
 *       **Response:**
 *       - On success: Returns the details of the authenticated doctor, including fields such as `_id`, `firstName`, `lastName`, `email`, `gender`, `specialization`, `bio`, `dob`, `phone`, and more.
 *       - On error: Provides details about issues such as invalid token, doctor not found, or server errors.
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
 *                 _id:
 *                   type: string
 *                   description: The unique identifier of the doctor.
 *                   example: "66c5c864a73c8c2f1cbad794"
 *                 firstName:
 *                   type: string
 *                   example: "John"
 *                 lastName:
 *                   type: string
 *                   example: "Doe"
 *                 email:
 *                   type: string
 *                   example: "johndoe@example.com"
 *                 password:
 *                   type: string
 *                   description: Hashed password of the doctor (not usually returned in responses for security reasons).
 *                   example: "$2b$10$tD12oUKX6xnnIXfVzbFtOu00EN/VTdtWY5wIGOBkqfAYZ3wUkrGYy"
 *                 gender:
 *                   type: string
 *                   example: "M"
 *                 specialization:
 *                   type: string
 *                   example: "Cardiology"
 *                 patients:
 *                   type: array
 *                   items:
 *                     type: object
 *                   example: []
 *                 sessions:
 *                   type: array
 *                   items:
 *                     type: object
 *                   example: []
 *                 bio:
 *                   type: string
 *                   example: "Experienced cardiologist with over 10 years of practice."
 *                 phone:
 *                   type: string
 *                   example: "1234567890"
 *                 dob:
 *                   type: string
 *                   example: "1980-05-20"
 *                 createdAt:
 *                   type: string
 *                   format: date-time
 *                   example: "2024-08-21T10:58:44.532Z"
 *                 updatedAt:
 *                   type: string
 *                   format: date-time
 *                   example: "2024-08-21T11:36:03.155Z"
 *                 __v:
 *                   type: integer
 *                   example: 0
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
 *     description: |
 *       Updates the authenticated doctor's details. This endpoint requires authentication with a valid session token and must be performed by the doctor who owns the profile.
 *       
 *       **Authentication:**
 *       - Token-based authentication is required, where the `X-Token` header must contain a valid session token.
 *       - Requires a role of `doctor`.
 *       
 *       **Request Body:**
 *       - Required fields: `firstName`, `lastName`, `password` (if updating, must be confirmed and meet strength criteria), `confirmPassword` (must match `password`), `gender` (must be 'M' or 'F'), `specialization`, `bio`, `dob`, `phone`, `address`, `city`, `state`.
 *       - Note: The `email` cannot be updated.
 *       
 *       **Response:**
 *       - On success: Returns the updated details of the doctor, including fields such as `_id`, `firstName`, `lastName`, `email`, `gender`, `specialization`, `bio`, `dob`, `phone`, and more.
 *       - On error: Provides details about validation issues, unauthorized access, or server errors.
 *     tags:
 *       - Doctors
 *     parameters:
 *       - name: id
 *         in: path
 *         description: The unique identifier of the doctor to retrieve.
 *         required: true
 *         schema:
 *           type: string
 *           example: "66c5c864a73c8c2f1cbad794"
 *       - name: x-token
 *         in: header
 *         description: Token used for authentication.
 *         required: true
 *         schema:
 *           type: string
 *           example: "your-authentication-token"
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               firstName:
 *                 type: string
 *                 example: "Jenna"
 *               lastName:
 *                 type: string
 *                 example: "Dean"
 *               email:
 *                 type: string
 *                 example: "jennadean@example.com"
 *               password:
 *                 type: string
 *                 example: "newP@ssw0rd!"
 *               confirmPassword:
 *                 type: string
 *                 example: "newP@ssw0rd!"
 *               gender:
 *                 type: string
 *                 example: "F"
 *               specialization:
 *                 type: string
 *                 example: "Dermatology"
 *               bio:
 *                 type: string
 *                 example: "Experienced dermatologist with over 15 years of practice."
 *               dob:
 *                 type: string
 *                 example: "1975-02-10"
 *               phone:
 *                 type: string
 *                 example: "1234567899"
 *               contact:
 *                 type: object
 *                 properties:
 *                   address:
 *                     type: string
 *                     example: "1234 Sunset Blvd"
 *                   city:
 *                     type: string
 *                     example: "Los Angeles"
 *                   state:
 *                     type: string
 *                     example: "CA"
 *     responses:
 *       200:
 *         description: Doctor details retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 _id:
 *                   type: string
 *                   description: The unique identifier of the doctor.
 *                   example: "66c5dc5e9b6ae671e3039018"
 *                 firstName:
 *                   type: string
 *                   example: "hn"
 *                 lastName:
 *                   type: string
 *                   example: "Doe"
 *                 email:
 *                   type: string
 *                   example: "hndoe@example.com"
 *                 password:
 *                   type: string
 *                   description: The hashed password of the doctor.
 *                   example: "$2b$10$77L6Qn25dukWrfYbPJ4Zie/GtmnshaKxqIBhSm5e1lOFLS4332rKW"
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
 *                   example: "1234567890"
 *                 patients:
 *                   type: array
 *                   items:
 *                     type: string
 *                   example: []
 *                 sessions:
 *                   type: array
 *                   items:
 *                     type: string
 *                   example: []
 *                 createdAt:
 *                   type: string
 *                   format: date-time
 *                   example: "2024-08-21T12:23:58.122Z"
 *                 updatedAt:
 *                   type: string
 *                   format: date-time
 *                   example: "2024-08-21T12:23:58.277Z"
 *                 __v:
 *                   type: integer
 *                   example: 0
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
 *     description: |
 *       Deletes the authenticated doctor's profile. A doctor can only delete their own profile using this endpoint. 
 *       This action requires authentication and must be performed by the doctor who owns the profile. 
 *       
 *       **Authentication:**
 *       - Token-based authentication is required, where the `X-Token` header must contain a valid session token.
 *       - Requires a role of `doctor`.
 *       
 *       **Request Parameters:**
 *       - `id`: The unique identifier of the doctor to delete.
 *       
 *       **Response:**
 *       - On success: Returns a confirmation message indicating that the doctor has been deleted.
 *       - On error: Provides details about missing ID, unauthorized access, or server errors.
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

// Doctor POST a new session using POST /sessions in the session's routes
router.get('/doctors/:id/sessions/', AuthMiddleware({ role: 'doctor' }), DoctorController.getDoctorSessions);
router.get('/doctors/:id/sessions/:sessionId', AuthMiddleware({ role: 'doctor' }), DoctorController.getDoctorSession);
router.put('/doctors/:id/sessions/:sessionId', AuthMiddleware({ role: 'doctor' }), DoctorController.updateDoctorSession);
router.delete('/doctors/:id/sessions/:sessionId', AuthMiddleware({ role: 'doctor' }), DoctorController.deleteDoctorSession);

// Doctor GET all patients using GET /patients in the patient's routes
// We have not sittled on the DELETE method for this route
router.get('/doctors/:id/patients/', AuthMiddleware({ role: 'doctor' }), DoctorController.getDoctorPatients);
router.get('/doctors/:id/patients/:patientId', AuthMiddleware({ role: 'doctor' }), DoctorController.getDoctorPatient);
router.put('/doctors/:id/patients/:patientId', AuthMiddleware({ role: 'doctor' }), DoctorController.updateDoctorPatient);

// Will be imported by PatientRoutes.js
export default router;
