/* eslint-disable no-unused-expressions */
import { ErrorRequestHandler, NextFunction } from 'express';
import config from '../../config';
import { IGenericErrorMessage } from '../../interfaces/error';
import handleValidationError from '../../errors/handleValidationError';
import ApiError from '../../errors/ApiError';
import { ErrorLogger } from '../../shared/logger';
import { ZodError } from 'zod';
import handleZodError from '../../errors/handleZodError';
import handleCastError from '../../errors/handleCastError';

//jodi express r req pattern error, req, res,next hoy tahole take errorRequestHandler bole
const globalErrorHandler: ErrorRequestHandler = (
  error,
  req,
  res,
  next: NextFunction
) => {
  config.env === 'development'
    ? console.log('🚀 global Error development Handler =>  ', error)
    : ErrorLogger.error('🚀 global Error Handler =>  ', error);

  //initial error structure
  let statusCode = 500;
  let message = 'Something Went Wrong !';
  let errorMessages: IGenericErrorMessage[] = [];

  //ValidationError
  if (error?.name === 'ValidationError') {
    const simplifiedError = handleValidationError(error);
    statusCode = simplifiedError?.statusCode;
    message = simplifiedError?.message;
    errorMessages = simplifiedError?.errorMessages;
  }

  //zod error
  else if (error instanceof ZodError) {
    const simplifiedError = handleZodError(error);
    statusCode = simplifiedError?.statusCode;
    message = simplifiedError?.message;
    errorMessages = simplifiedError?.errorMessages;
  }

  //cast Error
  else if (error?.name === 'CastError') {
    // res.status(200).json({ error });
    const simplifiedError = handleCastError(error);
    statusCode = simplifiedError?.statusCode;
    message = simplifiedError?.message;
    errorMessages = simplifiedError?.errorMessages;
  }

  //instance of api error
  else if (error instanceof ApiError) {
    statusCode = error?.statusCode;
    message = error?.message;
    errorMessages = error?.message
      ? [
          {
            path: ' ',
            message: error?.message,
          },
        ]
      : [];
  }
  //instance of internal js error
  else if (error instanceof Error) {
    message = error?.message;
    errorMessages = error?.message
      ? [
          {
            path: ' ',
            message: error?.message,
          },
        ]
      : [];
  }

  res.status(statusCode).json({
    success: false,
    message,
    errorMessages,
    stack: config.env !== 'production' ? error.stack : undefined,
  });
};

export default globalErrorHandler;
