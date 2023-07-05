import { Request, Response } from 'express';
import httpStatus from 'http-status';
import catchAsync from '../../../shared/catchAsync';
import pick from '../../../shared/pick';
import { IAcademicFaculty } from './academicFaculty.interface';
import sendResponse from '../../../shared/sentResponse';
import { academicFacultyFilterableFields } from './academicFaculty.constrains';
import { paginationfields } from '../../../constants/pagination';
import { AcademicFacultyService } from './academicFaculty.service';

//create faculty
const createFaculty = catchAsync(async (req: Request, res: Response) => {
  const { ...academicFacultyData } = req.body;
  const result = await AcademicFacultyService.createFaculty(
    academicFacultyData
  );
  sendResponse<IAcademicFaculty>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Academic Faculty created successfully',
    data: result,
  });
});

//get all faculty
const getAllFaculties = catchAsync(async (req: Request, res: Response) => {
  console.log(req.user);
  const filters = pick(req.query, academicFacultyFilterableFields);
  const paginationOptions = pick(req.query, paginationfields);

  const result = await AcademicFacultyService.getAllFaculties(
    filters,
    paginationOptions
  );

  sendResponse<IAcademicFaculty[]>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Academic Faculties retrieved successfully',
    meta: result.meta,
    data: result.data,
  });
});

const getSingleFaculty = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const result = await AcademicFacultyService.getSingleFaculty(id);

  sendResponse<IAcademicFaculty>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Academic Faculty fetched successfully',
    data: result,
  });
});

const updateFaculty = catchAsync(
  catchAsync(async (req: Request, res: Response) => {
    const { id } = req.params;
    const updatedData = req.body;
    const result = await AcademicFacultyService.updateFaculty(id, updatedData);

    sendResponse<IAcademicFaculty>(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Academic Faculty updated successfully',
      data: result,
    });
  })
);

const deleteFaculty = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const result = await AcademicFacultyService.deleteByIdFromDB(id);

  sendResponse<IAcademicFaculty>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Academic Faculty deleted successfully',
    data: result,
  });
});

export const AcademicFacultyController = {
  createFaculty,
  getAllFaculties,
  getSingleFaculty,
  updateFaculty,
  deleteFaculty,
};
