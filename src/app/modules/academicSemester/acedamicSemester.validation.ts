import { z } from 'zod';
import {
  academicSemesterCodes,
  academicSemesterMonths,
  academicSemesterTitles,
} from './academicSemester.constant';

const createAcademicSemesterZodSchema = z.object({
  body: z.object({
    title: z.enum([...academicSemesterTitles] as [string, ...string[]], {
      required_error: 'Semester title is Required',
    }),
    year: z.string({
      required_error: 'Semester Year is Required',
    }),
    code: z.enum([...academicSemesterCodes] as [string, ...string[]]),

    startMonth: z.enum([...academicSemesterMonths] as [string, ...string[]], {
      required_error: 'Start Month is Required for a Semester',
    }),
    endMonth: z.enum([...academicSemesterMonths] as [string, ...string[]], {
      required_error: 'End  Month is Required for a Semester',
    }),
  }),
});

const updateAcademicSemesterZodSchema = z
  .object({
    body: z.object({
      title: z
        .enum([...academicSemesterTitles] as [string, ...string[]], {
          required_error: 'Semester title is Required',
        })
        .optional(),
      year: z
        .string({
          required_error: 'Semester Year is Required',
        })
        .optional(),
      code: z
        .enum([...academicSemesterCodes] as [string, ...string[]])
        .optional(),

      startMonth: z
        .enum([...academicSemesterMonths] as [string, ...string[]], {
          required_error: 'Start Month is Required for a Semester',
        })
        .optional(),
      endMonth: z
        .enum([...academicSemesterMonths] as [string, ...string[]], {
          required_error: 'End  Month is Required for a Semester',
        })
        .optional(),
    }),
  })
  .refine(
    data =>
      (data.body.title && data.body.code) ||
      (!data.body.title && !data.body.code),
    {
      message: 'Either Both Title and Code should be Provider or Neither',
    }
  );

export const AcademicSemesterValidation = {
  createAcademicSemesterZodSchema,
  updateAcademicSemesterZodSchema,
};
