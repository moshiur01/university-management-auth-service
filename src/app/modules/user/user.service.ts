import config from '../../../config/index';
import ApiError from '../../../errors/ApiError';
// import { generateStudentId } from './user.utlis';
import { IUser } from './user.interface';
import { User } from './user.model';

//create user into database
const createUser = async (user: IUser): Promise<IUser | null> => {
  // const academicSemester = {
  //   code: '01',
  //   year: '2025',
  // };
  //auto generated incremental id
  // const id = await generateStudentId(academicSemester);
  //
  // user.id = id;
  if (!user.password) {
    user.password = config.default_user_pass as string;
  }
  const CreatedUser = await User.create(user);

  if (!CreatedUser) {
    throw new ApiError(400, 'Failed to Create User');
  }

  return CreatedUser;
};

export const UserService = {
  createUser,
};
