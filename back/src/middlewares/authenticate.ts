import { NextFunction, Request, Response } from 'express';
import { auth } from '../config/firebase';

declare module 'express-serve-static-core' {
  interface Request {
    user?: { uid: string };
  }
}

export const authenticate = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      res.status(401).json({ message: 'Authorization header missing or invalid' });
      return;
    }

    const token = authHeader.split(' ')[1];
    if (!token) {
      res.status(401).json({ message: 'Token not provided' });
      return;
    }

    const decoded = await auth.verifyIdToken(token);
    if (!decoded || !decoded.uid) {
      res.status(401).json({ message: 'Invalid token payload' });
      return;
    }

    req.user = { uid: decoded.uid };
    next();
  } catch (error) {
    console.error('Invalid token:', error);
    res.status(401).json({ message: 'Invalid or expired token ' });
  }
};
