import { Request, Response, NextFunction } from 'express';
import { TUser } from './handler';
import { validateAccessToken } from '@baijanstack/express-auth';
import jwt from 'jsonwebtoken';

declare module 'express-serve-static-core' {
  interface Request {
    user?: TUser;
  }
}

const tokensecret = process.env.TOKEN_SECRET;
if (!tokensecret) {
  throw new Error('TOKEN_SECRET environment variable is required');
}

export const storeUserDataFromToken = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  validateAccessToken(req, res, (err) => {
    if (err) {
      console.error('Token validation error:', err.message || err);
      return res
        .status(401)
        .json({ message: 'Unauthorized: Invalid or expired token' });
    }

    // @baijanstack/express-auth ko validateAccessToken set na vayera manually decode gareko
    if (!req.user) {
      const authHeader = req.headers.authorization;
      const token = authHeader?.split(' ')[1];

      if (token) {
        try {
          const decoded = jwt.verify(token, tokensecret) as TUser;
          req.user = decoded; // Manually attaching the decoded user data
          console.log('Manually decoded token payload:', decoded);
        } catch (decodeError) {
          console.error('Manual decoding failed:', decodeError.message);
          return res
            .status(401)
            .json({ message: 'Unauthorized: Failed to decode token' });
        }
      } else {
        console.error('No token provided');
        return res.status(401).json({ message: 'Unauthorized: Token missing' });
      }
    }

    console.log('Req.user after token validation or decoding:', req.user);
    next();
  });
};

export const checkRole = (allowedRoles: string[]) => {
  return (req: Request, res: Response, next: NextFunction) => {
    const userRole = req.user?.role; // Access role from req.user
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
