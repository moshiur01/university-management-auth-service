import mongoose from 'mongoose';
import config from '../../../config/index';
import ApiError from '../../../errors/ApiError';
import { AcademicSemester } from '../academicSemester/academicSemester.model';
import { IStudent } from '../student/student.interface';
import { IUser } from './user.interface';
import { User } from './user.model';
import { generateStudentId } from './user.utlis';
import { Student } from '../student/student.model';
import httpStatus from 'http-status';

//create  new student into database
const createStudent = async (
  student: IStudent,
  user: IUser
): Promise<IUser | null> => {
  //if the user don't give  a password then take the default password
  if (!user.password) {
    user.password = config.default_student_pass as string;
  }

  //set student role
  user.role = 'student';

  //get the specific academic Semester using the id get from student object which is come from the controller
  const academicSemester = await AcademicSemester.findById(
    student.academicSemester
  );

  //add all the data for new user
  let newUserAllData = null;

  // start the session
  const session = await mongoose.startSession();

  try {
    session.startTransaction();

    //generate student Id
    const id = await generateStudentId(academicSemester);

    //assign the id to user and student object
    user.id = id;
    student.id = id;

    // create new student using session and it return array
    const newStudent = await Student.create([student], { session });

    if (!newStudent.length) {
      throw new ApiError(httpStatus.BAD_REQUEST, 'Failed to Create Student');
    }
    //set student ===>  _id into user.student
    user.student = newStudent[0]._id;

    //create new user
    const newUser = await User.create([user], { session });

    if (!newUser.length) {
      throw new ApiError(httpStatus.BAD_REQUEST, 'Failed to Create User');
    }

    newUserAllData = newUser[0];

    await session.commitTransaction();
    await session.endSession();
  } catch (error) {
    await session.abortTransaction();
    await session.endSession();
    throw error;
  }

  // user => student => academicSemester, academicDepartment, academicFaculty (reference field)
  //populate nested fields

  if (newUserAllData) {
    newUserAllData = await User.findOne({ id: newUserAllData.id }).populate({
      path: 'student',
      populate: [
        {
          path: 'academicSemester',
        },
        {
          path: 'academicDepartment',
        },
        {
          path: 'academicFaculty',
        },
      ],
    });
  }

  return newUserAllData;
};

export const UserService = {
  createStudent,
};
