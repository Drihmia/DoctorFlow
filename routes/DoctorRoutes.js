import { Router } from 'express';
import DoctorController from '../controllers/DoctorController';

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

router.get('/doctors', DoctorController.getAllDoctors);

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
router.post('/doctors', DoctorController.addDoctor);

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
router.get('/doctors/:id', DoctorController.getDoctor);
router.put('/doctors/:id', DoctorController.updateDoctor);
router.delete('/doctors/:id', DoctorController.deleteDoctor);

// Will be imported by PatientRoutes.js
export default router;