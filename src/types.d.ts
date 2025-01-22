import { UserPayload } from './middleware/authMiddleware'; // Adjust the import path accordingly

declare global {
  namespace Express {
    interface Request {
      user?: UserPayload; // Adding user property to request interface
    }
  }
}

/**
 * Augments the Express Request interface to include a `user` object.
 * This allows the user information (such as the user ID) to be available in all requests.
 * @namespace Express
 * @interface Request
 * @property {UserPayload} user - The user payload added by authentication middleware.
 */
