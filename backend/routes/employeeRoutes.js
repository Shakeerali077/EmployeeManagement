import express from 'express';
import { createEmployee, getEmployees, getEmployeeById, updateEmployee, deleteEmployee } from '../controllers/employeeController.js';
import authMiddleware from '../middleware/authMiddleware.js';
// import multer from 'multer';
import upload from '../config/uploadConfig.js';  // Import the multer config

const router = express.Router();
// const upload = multer({ dest: 'uploads/' });


// Use the `upload.single('image')` middleware for file upload routes
router.post('/employees', authMiddleware, upload.single('image'), createEmployee);
router.put('/employees/:id', authMiddleware, upload.single('image'), updateEmployee);



// router.post('/employees', authMiddleware, upload.single('image'), createEmployee);
router.get('/employees', authMiddleware, getEmployees);
router.get('/employees/:id', authMiddleware, getEmployeeById);
// router.put('/employees/:id', authMiddleware, upload.single('image'), updateEmployee);
router.delete('/employees/:id', authMiddleware, deleteEmployee);



export default router;
