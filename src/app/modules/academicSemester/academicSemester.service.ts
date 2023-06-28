import httpStatus from 'http-status';
import ApiError from '../../../errors/ApiError';
import {
  academicSemesterSearchableFields,
  academicSemesterTitleCodeMapper,
} from './academicSemester.constant';
import {
  IAcademicSemester,
  IAcademicSemesterFilters,
} from './academicSemester.interface';
import { AcademicSemester } from './academicSemester.model';
import { IPaginationOptions } from '../../../interfaces/pagination';
import { IGenericResponse } from '../../../interfaces/common';
import { paginationHelper } from '../../../helpers/paginationHelper';
import { SortOrder } from 'mongoose';

//create a semester
const createSemester = async (
  payload: IAcademicSemester
): Promise<IAcademicSemester> => {
  // Semester Code with title Validation
  if (academicSemesterTitleCodeMapper[payload.title] !== payload.code) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Invalid Semester code');
  } else {
    const result = await AcademicSemester.create(payload);
    return result;
  }
};

//get all semester with conditions or without conditions
const getAllSemesters = async (
  filters: IAcademicSemesterFilters,
  paginationOptions: IPaginationOptions
): Promise<IGenericResponse<IAcademicSemester[]>> => {
  //search term for the filtering
  const { searchTerm, ...filersData } = filters;

  //combine all the regex search related field in a an empty array
  const andConditions = [];
  if (searchTerm) {
    andConditions.push({
      $or: academicSemesterSearchableFields.map(field => ({
        [field]: {
          $regex: searchTerm,
          $options: 'i',
        },
      })),
    });
  }

  // const andCondition = [
  //   {
  //     $or: [
  //       {
  //         title: { $regex: searchTerm, $options: 'i' },
  //       },
  //       {
  //         code: { $regex: searchTerm, $options: 'i' },
  //       },
  //       {
  //         year: { $regex: searchTerm, $options: 'i' },
  //       },
  //     ],
  //   },
  // ];

  //exact filtering
  if (Object.keys(filersData).length) {
    andConditions.push({
      $and: Object.entries(filersData).map(([field, value]) => ({
        [field]: value,
      })),
    });
  }

  //pagination term

  const { page, limit, skip, sortBy, sortOrder } =
    paginationHelper.calculatePagination(paginationOptions);

  //sort condition
  const sortConditions: { [key: string]: SortOrder } = {};
  if (sortBy && sortOrder) {
    sortConditions[sortBy] = sortOrder;
  }

  //cheek either the condition is empty or not
  const whereConditions =
    andConditions.length > 0 ? { $and: andConditions } : {};

  const result = await AcademicSemester.find(whereConditions)
    .sort(sortConditions)
    .skip(skip)
    .limit(limit);

  const total = await AcademicSemester.countDocuments();
  return {
    meta: {
      page,
      limit,
      total,
    },
    data: result,
  };
};

//get a single semester
const getSingleSemester = async (
  id: string
): Promise<IAcademicSemester | null> => {
  const result = await AcademicSemester.findById(id);
  return result;
};

//update semester
const updateSemester = async (
  id: string,
  payload: Partial<IAcademicSemester>
): Promise<IAcademicSemester | null> => {
  // Semester Code with title Validation
  if (
    payload.title &&
    payload.code &&
    academicSemesterTitleCodeMapper[payload.title] !== payload.code
  ) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Invalid Semester code');
  }
  const result = await AcademicSemester.findOneAndUpdate({ _id: id }, payload, {
    new: true,
  });
  return result;
};

//update semester
const deleteSemester = async (
  id: string
): Promise<IAcademicSemester | null> => {
  const result = await AcademicSemester.findByIdAndDelete({ _id: id });
  return result;
};

export const AcademicSemesterService = {
  createSemester,
  getAllSemesters,
  getSingleSemester,
  updateSemester,
  deleteSemester,
};
