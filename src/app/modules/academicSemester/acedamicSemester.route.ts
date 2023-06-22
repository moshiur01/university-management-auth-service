import express from 'express';
import validateRequest from '../../middleware/validateRequest';
import { AcademicSemesterValidation } from './acedamicSemester.validation';
import { academicSemesterController } from './academicSemester.controller';

const router = express.Router();

router.post(
  '/create-semester',
  validateRequest(AcademicSemesterValidation.createAcademicSemesterZodSchema),
  academicSemesterController.createSemester
);
router.get('/:id', academicSemesterController.getSingleSemester);
router.get('/', academicSemesterController.getAllSemester);

export const AcademicSemesterRoutes = router;
