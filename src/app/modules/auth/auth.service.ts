import httpStatus from 'http-status';
import ApiError from '../../../errors/ApiError';
import { JwtPayload, Secret } from 'jsonwebtoken';
import { User } from '../user/user.model';
// import bcrypt from 'bcrypt';
import {
  ILoginUser,
  ILoginUserResponse,
  IRefreshTokenResponse,
  IUpdatePassword,
} from './auth.interface';
import config from '../../../config';
import { JwtHelpers } from '../../../helpers/jwtHelper';

//generate new user access and refresh token
const loginUser = async (payload: ILoginUser): Promise<ILoginUserResponse> => {
  const { id, password } = payload;

  //create User Instance
  const user = new User();

  //check user
  const isUserExist = await user.isUserExists(id);
  if (!isUserExist) {
    throw new ApiError(httpStatus.NOT_FOUND, 'User Does Not Exists');
  }

  //check password
  if (
    isUserExist.password &&
    !(await user.isPasswordMatch(password, isUserExist.password))
  ) {
    throw new ApiError(httpStatus.UNAUTHORIZED, 'Password is incorrect');
  }

  //create access token
  const { id: userId, role, needsPasswordChange } = isUserExist;
  const accessToken = JwtHelpers.createToken(
    { userId, role },
    config.jwt.jwt_token as Secret,
    config.jwt.jwt_token_expires_in as string
  );
  // refresh token
  const refreshToken = JwtHelpers.createToken(
    { userId, role },
    config.jwt.jwt_refresh_token as Secret,
    config.jwt.jwt_refresh_token_expires_in as string
  );

  return {
    accessToken,
    refreshToken,
    needsPasswordChange,
  };
};

//generate access token via refresh token
const refreshToken = async (token: string): Promise<IRefreshTokenResponse> => {
  //verify refresh token
  let verifiedToken = null;
  try {
    verifiedToken = JwtHelpers.verifyToken(
      token,
      config.jwt.jwt_refresh_token as Secret
    );
    // console.log(verifiedToken);
  } catch (err) {
    throw new ApiError(httpStatus.FORBIDDEN, 'Invalid Refresh Token');
  }

  //checking  user
  const { userId } =
    typeof verifiedToken === 'string'
      ? JSON.parse(verifiedToken)
      : verifiedToken;

  const user = new User();
  const isUserExist = await user.isUserExists(userId);

  //throw not found error
  if (!isUserExist) {
    throw new ApiError(httpStatus.NOT_FOUND, 'User does not Exist');
  }

  //generate new access token based on the refresh token
  const newAccessToken = JwtHelpers.createToken(
    { id: isUserExist?.id, role: isUserExist?.role },
    config.jwt.jwt_token as Secret,
    config.jwt.jwt_token_expires_in as string
  );

  return { accessToken: newAccessToken };
};

// update password
const updatePassword = async (
  userData: JwtPayload | null,
  payload: IUpdatePassword
): Promise<void> => {
  const { oldPassword, newPassword } = payload;

  //create User Instance
  const user = new User();

  // checking the user
  // const isUserExist = await user.isUserExists(userData?.userId);

  //alternative way
  const isUserExist = await User.findOne({ id: userData?.userId }).select(
    '+password'
  );

  if (!isUserExist) {
    throw new ApiError(httpStatus.NOT_FOUND, 'User Does Not Exists');
  }

  //checking old password
  if (
    isUserExist.password &&
    !(await user.isPasswordMatch(oldPassword, isUserExist.password))
  ) {
    throw new ApiError(httpStatus.UNAUTHORIZED, 'Old Password is incorrect');
  }

  //========way 01 =========//

  // //hash password before saving
  // const newHashPassword = await bcrypt.hash(
  //   newPassword,
  //   Number(config.bcrypt_salt_rounds)
  // );

  // //update password
  // const updatedData = {
  //   password: newHashPassword,
  //   needsPasswordChange: false,
  //   passwordChangedAt: new Date(),
  // };
  // await User.findByIdAndUpdate({ id: userData?.userId }, updatedData);

  //========way 02 =========//

  //update data before saving

  isUserExist.password = newPassword; //we don't need to hash the password because pre method hash the password
  isUserExist.needsPasswordChange = false;

  //updating using save()
  isUserExist.save();
};
export const AuthService = {
  loginUser,
  refreshToken,
  updatePassword,
};
