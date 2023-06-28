import express from 'express';
import { AcademicDepartmentValidation } from './academicDepartment.validation';
import validateRequest from '../../middleware/validateRequest';
import { AcademicDepartmentController } from './academicDepartment.controller';
const router = express.Router();

router.post(
  '/create-department',
  validateRequest(
    AcademicDepartmentValidation.createAcademicDepartmentZodSchema
  ),
  AcademicDepartmentController.createDepartment
);

//get a single department
router.get('/:id', AcademicDepartmentController.getSingleDepartment);

router.get('/', AcademicDepartmentController.getAllDepartments);
export const AcademicDepartmentRoutes = router;
