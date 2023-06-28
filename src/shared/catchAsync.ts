import { NextFunction, Response, Request, RequestHandler } from 'express';

const catchAsync =
  (fn: RequestHandler) =>
  async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      await fn(req, res, next);
    } catch (error) {
      next(error);
    }
  };

export default catchAsync;

/**
 * try{
 * const {user} = req.body
 * const result = await UserService.createUser(user)
 * res.status(200).json(
 * {
 * success:true,
 * message: "User Created Successfully"
 * data: result,
 * });
 * }
 *
 * catch(error)
 * {
 * next(error)
 * }
 */
