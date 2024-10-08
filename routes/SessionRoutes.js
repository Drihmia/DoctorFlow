import router from './PatientRoutes';
import SessionController from '../controllers/SessionController';
import AuthMiddleware from '../middlewares/authMiddleware';

/**
 * @swagger
 * /sessions:
 *   post:
 *     summary: Adds a new session for a doctor and patient - for doctor.
 *     description: |
 *       Creates a new session for the given doctor and patient.
 *        This endpoint requires authentication with a valid session token and must
 *        be performed by an authenticated doctor.
 *
 *       **Authentication:**
 *       - Token-based authentication is required,
 *        where the `X-Token` header must contain a valid session token.
 *       - Requires a role of `doctor`.
 *
 *       **Request Body:**
 *       - Required fields: `doctorId`, `patientId`.
 *       - Optional fields: `type`, `date`, `time`, `nextAppointment`, `notes`, `privateNotes`,
 *        `prescription`, `diagnosis`, `labTests`, `radOrders`.
 *
 *       **Response:**
 *       - On success: Returns the details of the newly created session, including fields such as
 *        `_id`, `doctor`, `patient`, `type`, `date`, `time`, and more.
 *       - On error: |
 *          Provides details about validation issues, unauthorized access, or server errors.
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
 *           example: "b14c9f0e-2a15-40f6-8187-f4c5ad4638c5"
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               doctorId:
 *                 type: string
 *                 description: The ID of the doctor creating the session.
 *                 example: "66c5c864a73c8c2f1cbad794"
 *               patientId:
 *                 type: string
 *                 description: The ID of the patient for the session.
 *                 example: "66c6d13850a701dcd952a5d6"
 *               type:
 *                 type: string
 *                 enum: ["Consultation", "Follow up", "Routine"]
 *                 description: The type of session. Defaults to "Consultation".
 *                 example: "Consultation"
 *               date:
 *                 type: string
 *                 format: date-time
 *                 description: The date of the session. Defaults to the current date.
 *                 example: "2024-08-22T10:00:00Z"
 *               time:
 *                 type: string
 *                 description: The time of the session. Defaults to the current time.
 *                 example: "10:00"
 *               nextAppointment:
 *                 type: string
 *                 format: date-time
 *                 description: The next appointment date for the patient.
 *                 example: "2024-08-29T10:00:00Z"
 *               notes:
 *                 type: string
 *                 description: General notes visible to the doctor and patient.
 *                 example: "Follow-up in one week to assess blood pressure and
 *                  adjust treatment if necessary."
 *               privateNotes:
 *                 type: string
 *                 description: Private notes visible only to the doctor.
 *                 example: "Monitor blood pressure closely and assess for potential side effects
 *                  of Lisinopril. Consider adding additional tests if blood pressure
 *                  remains uncontrolled or if new symptoms arise."
 *               prescription:
 *                 type: string
 *                 description: Any prescription given during the session.
 *                 example: "20mg Lisinopril daily"
 *               diagnosis:
 *                 type: string
 *                 description: The diagnosis made during the session.
 *                 example: "Hypertension"
 *               labTests:
 *                 type: string
 *                 description: Any lab tests ordered during the session.
 *                 example: "Electrolyte panel, Renal function tests"
 *               radOrders:
 *                 type: string
 *                 description: Any radiology orders made during the session.
 *                 example: "Echocardiogram"
 *     responses:
 *       201:
 *         description: Session created successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 _id:
 *                   type: string
 *                   example: "66c6d13b50a701dcd952a5e0"
 *                 doctor:
 *                   type: string
 *                   example: "66c5c864a73c8c2f1cbad794"
 *                 patient:
 *                   type: string
 *                   example: "66c6d13850a701dcd952a5d6"
 *                 type:
 *                   type: string
 *                   example: "Consultation"
 *                 date:
 *                   type: string
 *                   format: date-time
 *                   example: "2024-08-22T10:00:00Z"
 *                 time:
 *                   type: string
 *                   example: "10:00"
 *                 nextAppointment:
 *                   type: string
 *                   format: date-time
 *                   example: "2024-08-29T10:00:00Z"
 *                 notes:
 *                   type: string
 *                   example: "Follow-up in one week to assess blood pressure and
 *                    adjust treatment if necessary."
 *                 privateNotes:
 *                   type: string
 *                   example: "Monitor blood pressure closely and assess for potential side effects
 *                    of Lisinopril. Consider adding additional tests if blood pressure remains
 *                    uncontrolled or if new symptoms arise."
 *                 prescription:
 *                   type: string
 *                   example: "20mg Lisinopril daily"
 *                 diagnosis:
 *                   type: string
 *                   example: "Hypertension"
 *                 labTests:
 *                   type: string
 *                   example: "Electrolyte panel, Renal function tests"
 *                 radOrders:
 *                   type: string
 *                   example: "Echocardiogram"
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
 *         description: Validation error or missing required fields.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Bad Request: Missing required fields"
 *       404:
 *         description: Not Found - Resource not found.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Doctor or patient not found"
 *       401:
 *         description: Unauthorized - Invalid or expired token.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Unauthorized: Invalid or expired token"
 *       403:
 *         description: Forbidden - Insufficient permissions to access this endpoint.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Forbidden: Only doctor can access this route.
 *                    Please login as doctor."
 *       500:
 *         description: Internal server error.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Internal server error"
 */
router.post('/sessions', AuthMiddleware({ role: 'doctor' }), SessionController.addSession);

/**
 * @swagger
 * /sessions:
 *   get:
 *     summary: Retrieve a list of all sessions - for dev.
 *     description: |
 *       **Note:** This endpoint is intended for development and testing purposes only.
 *        It should not be used in production environments with real patient data.
 *       Retrieves a list of all sessions with optional pagination.
 *        This endpoint is restricted to users with the 'dev' role and
 *        requires authentication using a valid token in the `x-token` header.
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
 *       - A list of sessions objects, each containing details such as:
 *        `_id`, `firstName`, `lastName`, `email`, `doctor`, `medicalHistory`, and more.
 *     tags:
 *       - Devs
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
 *         description: Appointment details retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   _id:
 *                     type: string
 *                     example: "66c715074cade6c9c617bc87"
 *                   doctor:
 *                     type: string
 *                     example: "66c5c864a73c8c2f1cbad794"
 *                   patient:
 *                     type: string
 *                     example: "66c6d13850a701dcd952a5d6"
 *                   type:
 *                     type: string
 *                     example: "Consultation"
 *                   date:
 *                     type: string
 *                     format: date-time
 *                     example: "2024-08-22T10:00:00.000Z"
 *                   time:
 *                     type: string
 *                     example: "10:00"
 *                   nextAppointment:
 *                     type: string
 *                     format: date-time
 *                     example: "2024-08-29T10:00:00.000Z"
 *                   notes:
 *                     type: string
 *                     example: "Follow-up in one week to assess blood pressure and
 *                      adjust treatment if necessary."
 *                   privateNotes:
 *                     type: string
 *                     example: |
 *                      "Monitor blood pressure closely and assess for potential side effects
 *                      of Lisinopril. Consider adding additional tests if blood pressure remains
 *                      uncontrolled or if new symptoms arise."
 *                   prescription:
 *                     type: string
 *                     example: "20mg Lisinopril daily"
 *                   diagnosis:
 *                     type: string
 *                     example: "Hypertension"
 *                   labTests:
 *                     type: string
 *                     example: "Electrolyte panel, Renal function tests"
 *                   radOrders:
 *                     type: string
 *                     example: "Echocardiogram"
 *                   createdAt:
 *                     type: string
 *                     format: date-time
 *                     example: "2024-08-22T10:37:59.808Z"
 *                   updatedAt:
 *                     type: string
 *                     format: date-time
 *                     example: "2024-08-22T10:37:59.809Z"
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
router.get('/sessions', AuthMiddleware({ role: 'dev' }), SessionController.getAllSessions);

// This route should never be exposed to the client
router.delete('/sessions/:id', AuthMiddleware({ role: 'doctor' }), SessionController.deleteSession);

export default router;
