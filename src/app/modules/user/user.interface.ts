import { Model, Types } from 'mongoose';
import { IStudent } from '../student/student.interface';
import { IFaculty } from '../faculty/faculty.interface';
import { IAdmin } from '../admin/admin.interface';

export type IUser = {
  id: string;
  role: string;
  password: string;
  needsPasswordChange: true | false;
  passwordChangedAt?: Date;
  student?: Types.ObjectId | IStudent;
  faculty?: Types.ObjectId | IFaculty;
  admin?: Types.ObjectId | IAdmin;
};

// Put all user instance methods in this interface
export type IUserMethods = {
  //instance 1
  isUserExists(id: string): Promise<Partial<IUser> | null>;

  //instance 2
  isPasswordMatch(
    givenPassword: string,
    savedPassword: string
  ): Promise<boolean>;
};
//object r poriborte Record
export type UserModel = Model<IUser, Record<string, unknown>, IUserMethods>;
