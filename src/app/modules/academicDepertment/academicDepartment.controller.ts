import { Request, Response } from 'express';
import catchAsync from '../../../shared/catchAsync';
import sendResponse from '../../../shared/sentResponse';
import { IAcademicDepartment } from './academicDepartment.interface';
import httpStatus from 'http-status';
import { AcademicDepartmentService } from './academicDepartment.service';
import pick from '../../../shared/pick';
import { academicDepartmentFilterableFields } from './academicDepartment.constrains';
import { paginationfields } from '../../../constants/pagination';

//create department
const createDepartment = catchAsync(async (req: Request, res: Response) => {
  const { ...academicDepartData } = req.body;
  const result = await AcademicDepartmentService.createDepartment(
    academicDepartData
  );

  sendResponse<IAcademicDepartment>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Academic Department Created Successfully',
    data: result,
  });
});

//get departments
const getAllDepartments = catchAsync(async (req: Request, res: Response) => {
  const filter = pick(req.query, academicDepartmentFilterableFields);
  const paginationOptions = pick(req.query, paginationfields);

  const result = await AcademicDepartmentService.getAllDepartments(
    filter,
    paginationOptions
  );

  sendResponse<IAcademicDepartment[]>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Academic Departments Fetched Successfully',
    meta: result.meta,
    data: result.data,
  });
});

//get a single department
const getSingleDepartment = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const result = await AcademicDepartmentService.getSingleDepartment(id);

  sendResponse<IAcademicDepartment>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Academic Department Fetched Successfully',
    data: result,
  });
});

export const AcademicDepartmentController = {
  createDepartment,
  getAllDepartments,
  getSingleDepartment,
};
