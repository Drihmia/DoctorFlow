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
 *         description: A list of doctors
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/models/doctorModel.js'
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

router.get('/doctors/:id', DoctorController.getDoctor);
router.put('/doctors/:id', DoctorController.updateDoctor);
router.delete('/doctors/:id', DoctorController.deleteDoctor);

// Will be imported by PatientRoutes.js
export default router;
