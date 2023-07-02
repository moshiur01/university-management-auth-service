import { z } from 'zod';
import { userConstant } from '../user/user.constant';

const updateFacultyZodSchema = z.object({
  body: z.object({
    name: z
      .object({
        firstName: z.string().optional(),
        lastName: z.string().optional(),
        middleName: z.string().optional(),
      })
      .optional(),
    dateOfBirth: z.string().optional(),
    gender: z
      .enum([...userConstant.gender] as [string, ...string[]])
      .optional(),
    email: z.string().email().optional(),
    contactNo: z.string().optional(),
    designation: z.string().optional(),
    emergencyContactNo: z.string().optional(),
    bloodGroup: z
      .enum([...userConstant.bloodGroup] as [string, ...string[]])
      .optional(),
    presentAddress: z.string().optional(),
    permanentAddress: z.string().optional(),
    academicDepartment: z.string().optional(),
    academicFaculty: z.string().optional(),
    profileImage: z.string().optional(),
  }),
});

export const facultyValidation = {
  updateFacultyZodSchema,
};
