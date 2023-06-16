import { z } from 'zod';
import {
  academicSemesterCodes,
  academicSemesterMonths,
  academicSemesterTitles,
} from './academicSemester.constant';

const createAcademicSemesterZodSchema = z.object({
  body: z.object({
    title: z.enum([...academicSemesterTitles] as [string, ...string[]], {
      required_error: 'Semester Title is Required',
    }),
    year: z.number({
      required_error: 'Semester Year is Required',
    }),
    code: z.enum([...academicSemesterCodes] as [string, ...string[]]),
  }),
  startMonth: z.enum([...academicSemesterMonths] as [string, ...string[]], {
    required_error: 'Start Month is Required for a Semester',
  }),
  endMonth: z.enum([...academicSemesterMonths] as [string, ...string[]], {
    required_error: 'End  Month is Required for a Semester',
  }),
});

export const AcademicSemesterValidation = {
  createAcademicSemesterZodSchema,
};
