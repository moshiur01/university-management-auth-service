import { Request, Response } from 'express';
import catchAsync from '../../../shared/catchAsync';
import pick from '../../../shared/pick';
import { facultyFilterableFields } from './faculty.constrain';
import { paginationfields } from '../../../constants/pagination';
import sendResponse from '../../../shared/sentResponse';
import { IFaculty } from './faculty.interface';
import httpStatus from 'http-status';
import { FacultyService } from './faculty.service';

const getAllFaculties = catchAsync(async (req: Request, res: Response) => {
  const filters = pick(req.query, facultyFilterableFields);

  const paginationOptions = pick(req.query, paginationfields);

  const result = await FacultyService.getAllFaculties(
    filters,
    paginationOptions
  );

  sendResponse<IFaculty[]>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Faculties Retrieved Successfully',
    data: result.data,
    meta: result.meta,
  });
});

//get single faculty
const getSingleFaculty = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id;
  const result = await FacultyService.getSingleFaculty(id);

  sendResponse<IFaculty>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Faculty retrieved Successfully',
    data: result,
  });
});

//update
const updateFaculty = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id;
  const updatedData = req.body;
  const result = await FacultyService.updateFaculty(id, updatedData);
  sendResponse<IFaculty>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Faculty Data Updated successfully!',
    data: result,
  });
});

export const FacultyController = {
  getAllFaculties,
  getSingleFaculty,
  updateFaculty,
};
