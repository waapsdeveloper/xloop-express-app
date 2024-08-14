// src/helpers/responseHelper.ts
import { Response } from 'express';

interface ResponseData {
  status: number;
  message: string;
  result?: any;
}

export const successResponse = (
  res: Response,
  message: string,
  result: any = null
): void => {
  res.status(200).json({
    status: 200,
    message,
    result,
  } as ResponseData);
};

export const errorResponse = (
  res: Response,
  statusCode: number,
  message: string,
  result: any = null
): void => {
  res.status(statusCode).json({
    status: statusCode,
    message,
    result,
  } as ResponseData);
};
