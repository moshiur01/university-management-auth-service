"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AcademicSemesterValidation = void 0;
const zod_1 = require("zod");
const academicSemester_constant_1 = require("./academicSemester.constant");
const createAcademicSemesterZodSchema = zod_1.z.object({
    body: zod_1.z.object({
        title: zod_1.z.enum([...academicSemester_constant_1.academicSemesterTitles], {
            required_error: 'Semester title is Required',
        }),
        year: zod_1.z.string({
            required_error: 'Semester Year is Required',
        }),
        code: zod_1.z.enum([...academicSemester_constant_1.academicSemesterCodes]),
        startMonth: zod_1.z.enum([...academicSemester_constant_1.academicSemesterMonths], {
            required_error: 'Start Month is Required for a Semester',
        }),
        endMonth: zod_1.z.enum([...academicSemester_constant_1.academicSemesterMonths], {
            required_error: 'End  Month is Required for a Semester',
        }),
    }),
});
const updateAcademicSemesterZodSchema = zod_1.z
    .object({
    body: zod_1.z.object({
        title: zod_1.z
            .enum([...academicSemester_constant_1.academicSemesterTitles], {
            required_error: 'Semester title is Required',
        })
            .optional(),
        year: zod_1.z
            .string({
            required_error: 'Semester Year is Required',
        })
            .optional(),
        code: zod_1.z
            .enum([...academicSemester_constant_1.academicSemesterCodes])
            .optional(),
        startMonth: zod_1.z
            .enum([...academicSemester_constant_1.academicSemesterMonths], {
            required_error: 'Start Month is Required for a Semester',
        })
            .optional(),
        endMonth: zod_1.z
            .enum([...academicSemester_constant_1.academicSemesterMonths], {
            required_error: 'End  Month is Required for a Semester',
        })
            .optional(),
    }),
})
    .refine(data => (data.body.title && data.body.code) ||
    (!data.body.title && !data.body.code), {
    message: 'Either Both Title and Code should be Provider or Neither',
});
exports.AcademicSemesterValidation = {
    createAcademicSemesterZodSchema,
    updateAcademicSemesterZodSchema,
};
