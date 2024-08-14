// src/middlewares/authMiddleware.ts
import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import users from '../models/userModel';

declare module 'express-serve-static-core' {
  interface Request {
    user?: any;
  }
}

// export const protect = (req: Request, res: Response, next: NextFunction) => {
//   const token = req.headers.authorization?.split(' ')[1];

//   if (token) {
//     try {
//       const decoded: any = jwt.verify(token, process.env.JWT_SECRET || 'secret');
//       req.user = users.find((user) => user.id === decoded.id);
//       next();
//     } catch (error) {
//       res.status(401).json({ message: 'Not authorized, token failed' });
//     }
//   } else {
//     res.status(401).json({ message: 'Not authorized, no token' });
//   }
// };


export const authMiddleware = async (ctx: Request, res: Response, next: NextFunction) => {

    const token = ctx.headers.authorization?.split(" ")[1] as string; // Get the token from the Authorization header
    ctx.body = token;
  
    if (!token) {
      res.status(401).json({
        status: 401,
        message: "Header authorization missing",
        result: null, // Assuming email is unique and fetchQuery returns an array of users (should be one user)
      }); //;
    }
  
    try {
      const secret = process.env.JWT_SECRET as string;
      const decoded = jwt.verify(token, secret) as any; // Verify the token with your secret key
      
      
      (ctx as any).userId = decoded.userId;
      await next(); // Proceed to the next middleware or route handler
    } catch (error) {
      console.log(error)
      res.status(401).json({
        status: 401,
        message: "Invalid or expired token",
        result: token, // Assuming email is unique and fetchQuery returns an array of users (should be one user)
      });
    }
  };
  