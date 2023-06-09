import { Request, Response } from 'express';
import catchAsync from '../../../shared/catchAsync';
import sendResponse from '../../../shared/sentResponse';
import httpStatus from 'http-status';
import { AuthService } from './auth.service';
import { ILoginUserResponse, IRefreshTokenResponse } from './auth.interface';
import config from '../../../config';

//generate login user refresh and access token
const loginUser = catchAsync(async (req: Request, res: Response) => {
  const { ...loginData } = req.body;
  const result = await AuthService.loginUser(loginData);
  const { refreshToken, ...others } = result;

  //set refresh token options
  const cookeOptions = {
    secure: config.env === 'production',
    httpOnly: true,
  };
  //set refresh token into cookies
  res.cookie('refreshToken', refreshToken, cookeOptions);

  sendResponse<ILoginUserResponse>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'User login Successfully',
    data: others,
  });
});

//generate new access token based on the refresh token
const refreshToken = catchAsync(async (req: Request, res: Response) => {
  const { refreshToken } = req.cookies;
  const result = await AuthService.refreshToken(refreshToken);

  //set refresh token options
  const cookieOptions = {
    secure: config.env === 'production',
    httpOnly: true,
  };
  //set refresh token into cookies
  res.cookie('refreshToken', refreshToken, cookieOptions);

  sendResponse<IRefreshTokenResponse>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'User login Successfully',
    data: result,
  });
});

//update password
const updatePassword = catchAsync(async (req: Request, res: Response) => {
  const user = req.user;
  const { ...passwordData } = req.body;
  await AuthService.updatePassword(user, passwordData);

  sendResponse<ILoginUserResponse>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Password Updated Successfully',
  });
});

export const AuthController = {
  loginUser,
  refreshToken,
  updatePassword,
};
