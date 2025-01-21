import { Request, Response, NextFunction } from 'express';
import { TUser } from './handler';
// import {Role} from '../../../../libs/lms-prisma/src/client';
import { Role } from '@prisma/client';
declare module 'express-serve-static-core' {
  interface Request {
    user?: TUser;
    decodedAccessToken?: TUser;
  }
}

export const storeUserDataFromToken = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const decodedToken = req.decodedAccessToken;
    if (!decodedToken) {
      return res.status(401).json({ message: 'Unauthorized: No token found' });
    }

    // Assign user data to `req.user`
    req.user = decodedToken as TUser;
    next();
  } catch (error) {
    console.error('Error processing token:', error.message);
    return res.status(401).json({ message: 'Unauthorized: Invalid token' });
  }
};
export const checkRole = (allowedRoles: Role[]) => {
  return (req: Request, res: Response, next: NextFunction) => {
    const userRole = req.user?.role as Role; //  Role for type safety
    console.log('User Role:', userRole); // Debugging user role

    if (!userRole || !allowedRoles.includes(userRole)) {
      console.error('Access denied: User role not allowed');
      return res
        .status(403)
        .json({ message: 'Forbidden: You do not have permission' });
    }

    next();
  };
};
