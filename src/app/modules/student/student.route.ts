import express from 'express';
import validateRequest from '../../middleware/validateRequest';
import { StudentValidation } from './student.validation';
import { StudentController } from './student.controller';

const router = express.Router();

router.get('/', StudentController.getAllStudents);
router.get('/:id', StudentController.getSingleStudent);
router.delete('/:id', StudentController.deleteStudent);

router.patch(
  '/:id',
  validateRequest(StudentValidation.updateStudentZodSchema),
  StudentController.updateStudent
);

export const StudentRoutes = router;
