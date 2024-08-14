// src/controllers/authController.ts
import { Request, Response } from 'express';
import generateToken from '../utils/generateToken';
import { loginSchema } from '../validators';
import { errorResponse, successResponse } from '../helpers/response-helper';
import { UserService } from '../services/userService';

const userService = new UserService();

export const loginUser = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  const { error } = loginSchema.validate({ email, password });
  if (error) {
    return errorResponse(res, 400, error.details[0].message);
  }
  const response = await userService.loginUser(email, password);
  if (response.status !== 200) {
    return errorResponse(res, response.status, response.message);
  }

  const user = response.result as any;
  const token = generateToken(user.id);
  return successResponse(res, response.message, {
    user: response.result,
    token,
  });
};
