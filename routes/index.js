import { Router } from 'express';
import DoctorController from '../controllers/DoctorController';

const route = Router();

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
route.get('/doctors', DoctorController.getAllDoctors);

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
route.post('/doctors', DoctorController.addDoctor);

route.get('/doctors/:id', DoctorController.getDoctor);
route.put('/doctors/:id', DoctorController.updateDoctor);
route.delete('/doctors/:id', DoctorController.deleteDoctor);

export default route;
