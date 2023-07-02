import { Request, Response } from 'express';
import httpStatus from 'http-status';
import catchAsync from '../../../shared/catchAsync';
import pick from '../../../shared/pick';
import { managementDepartmentFilterableFields } from './managementDepartment.constant';
import { IManagementDepartment } from './managementDepartment.interface';
import sendResponse from '../../../shared/sentResponse';
import { paginationfields } from '../../../constants/pagination';
import { ManagementDepartmentService } from './managementDepartment.service';

const createDepartment = catchAsync(async (req: Request, res: Response) => {
  const { ...departmentData } = req.body;
  const result = await ManagementDepartmentService.createDepartment(
    departmentData
  );

  sendResponse<IManagementDepartment>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Management department created successfully',
    data: result,
  });
});

const getAllDepartments = catchAsync(async (req: Request, res: Response) => {
  const filters = pick(req.query, managementDepartmentFilterableFields);
  const paginationOptions = pick(req.query, paginationfields);

  const result = await ManagementDepartmentService.getAllDepartments(
    filters,
    paginationOptions
  );

  sendResponse<IManagementDepartment[]>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Management Department Retrieved successfully',
    meta: result.meta,
    data: result.data,
  });
});

const getSingleDepartment = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const result = await ManagementDepartmentService.getSingleDepartment(id);

  sendResponse<IManagementDepartment>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Management Department Retrieved Successfully',
    data: result,
  });
});

const updateDepartment = catchAsync(
  catchAsync(async (req: Request, res: Response) => {
    const { id } = req.params;
    const updatedData = req.body;
    const result = await ManagementDepartmentService.updateDepartment(
      id,
      updatedData
    );

    sendResponse<IManagementDepartment>(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Management Department updated successfully',
      data: result,
    });
  })
);

const deleteDepartment = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const result = await ManagementDepartmentService.deleteDepartment(id);

  sendResponse<IManagementDepartment>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Management Department deleted successfully',
    data: result,
  });
});

export const ManagementDepartmentController = {
  createDepartment,
  getAllDepartments,
  getSingleDepartment,
  updateDepartment,
  deleteDepartment,
};
