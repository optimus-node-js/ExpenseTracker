import { Request, Response, NextFunction } from 'express';

export const isAuthenticated = (req: Request, res: Response, next: NextFunction) => {
  // Check if session exists and user is authenticated
  if (req.session && req.session.isAuthenticated && req.session.userId) {
    next();
  } else {
    res.status(401).json({ message: "Unauthorized. Please log in to continue." });
  }
};