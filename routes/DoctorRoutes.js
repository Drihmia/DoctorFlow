import { Router } from 'express';

import DoctorController from '../controllers/DoctorController';
import AuthenticationController from '../controllers/AuthenticationController';
import AuthMiddleware from '../middlewares/AuthMiddleware';

const router = Router();

/**
 * @swagger
 * tags:
 *   name: doctors
 *   description: User management and authentication
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

router.get('/doctors', AuthMiddleware({ role: 'doctor' }), DoctorController.getAllDoctors);

/**
 * @swagger
 * /doctors:
 *   post:
 *     summary: Create a new doctor
 *     tags: [Doctors]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Doctor'
 *     responses:
 *       201:
 *         description: The created doctor
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Doctor'
 *       400:
 *         description: Invalid input, object invalid
 *       500:
 *         description: Internal server error
 */
router.post('/doctors', AuthMiddleware({ role: 'doctor' }), DoctorController.addDoctor);

/**
 * @swagger
 * /doctors/connect:
 *   get:
 *     summary: Authenticate a doctor and generate a token
 *     tags: [Doctors]
 *     security:
 *       - BasicAuth: []
 *     responses:
 *       200:
 *         description: Successfully authenticated doctor and generated a token
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 token:
 *                   type: string
 *                   description: Authentication token for the doctor
 *       400:
 *         description: |
 *           Bad Request: Missing email or password
 *       401:
 *         description: |
 *           Unauthorized: Missing or invalid Authorization header or wrong password
 *       404:
 *         description: |
 *           Not Found: Doctor not found
 *       500:
 *         description: |
 *           Internal Server Error: Unexpected error during authentication
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
 *     summary: Retrieve a specific doctor by ID
 *     tags: [Doctors]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *           example: '66ba5199565d2c3eeda69687'
 *     responses:
 *       200:
 *         description: A single doctor object
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 _id:
 *                   type: string
 *                 firstName:
 *                   type: string
 *                 lastName:
 *                   type: string
 *                 email:
 *                   type: string
 *                   format: email
 *                 password:
 *                   type: string
 *                 gender:
 *                   type: string
 *                 specialization:
 *                   type: string
 *                 patients:
 *                   type: array
 *                   items:
 *                     type: string
 *                 appointments:
 *                   type: array
 *                   items:
 *                     type: string
 *                 dob:
 *                   type: string
 *                   format: date-time
 *                 createdAt:
 *                   type: string
 *                   format: date-time
 *                 updatedAt:
 *                   type: string
 *                   format: date-time
 *                 __v:
 *                   type: integer
 *       404:
 *         description: Doctor not found
 *       500:
 *         description: Internal server error
 */
router.get('/doctors/:id', AuthMiddleware({ role: 'doctor' }), DoctorController.getDoctor);
router.put('/doctors/:id', AuthMiddleware({ role: 'doctor' }), DoctorController.updateDoctor);
router.delete('/doctors/:id', AuthMiddleware({ role: 'doctor' }), DoctorController.deleteDoctor);

// Will be imported by PatientRoutes.js
export default router;
