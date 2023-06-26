import { Response, Request, NextFunction } from 'express';
import { AnyZodObject, ZodEffects } from 'zod';

const validateRequest =
  (schema: AnyZodObject | ZodEffects<AnyZodObject>) =>
  async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      await schema.parseAsync({
        body: req.body,
        query: req.query,
        param: req.params,
        cookies: req.cookies,
      });
      return next();
    } catch (error) {
      next(error);
    }
  };

export default validateRequest;

// middleware=>validateRequest(userZOd)=> async(req, res, next)
