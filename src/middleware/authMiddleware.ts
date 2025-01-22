import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

// Define interface for the JWT payload to ensure type safety
interface UserPayload {
  userId: number; // Match the userId with the number type (from the User entity)
  role: string;
  // Include other fields from your JWT payload
}

declare global {
  namespace Express {
    interface Request {
      user?: UserPayload;
    }
  }
}

// Middleware to authenticate a user by verifying the JWT token
export const authenticateJWT = (req: Request, res: Response, next: NextFunction): void => {
  const token = req.header('Authorization')?.split(' ')[1]; // Extract token from 'Authorization' header

  if (!token) {
     res.status(401).json({ message: 'Access Denied' }); 
     return;// No token, unauthorized
  }

  jwt.verify(token, process.env.JWT_SECRET as string, (err, user) => {
    if (err) {
       res.status(403).json({ message: 'Invalid or expired token' });
       return; // Token verification failed
    }

    // Attach the decoded user payload to the request object
    req.user = user as UserPayload;
    next(); // Proceed to the next middleware
  });
};

// Middleware to authorize access for admin users only
export const authorizeAdmin = (req: Request, res: Response, next: NextFunction): void => {
  if (req.user?.role !== 'admin') {
     res.status(403).json({ message: 'Admin access required' });
     return; // Role check failed, access forbidden
  }
  next(); // Proceed to the next middleware
};
