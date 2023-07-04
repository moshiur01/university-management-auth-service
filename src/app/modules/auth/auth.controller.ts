import { Request, Response } from 'express';
import catchAsync from '../../../shared/catchAsync';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const loginUser = catchAsync(async (req: Request, res: Response) => {
  console.log(req.body);
});

export const AuthController = {
  loginUser,
};
