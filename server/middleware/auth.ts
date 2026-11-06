import { Request, Response, NextFunction } from 'express';

export const isAuthenticated = (req: Request, res: Response, next: NextFunction) => {
  console.log('Auth middleware check:', {
    hasSession: !!req.session,
    isAuthenticated: req.session?.isAuthenticated,
    userId: req.session?.userId,
    cookies: req.headers.cookie
  });

  // Check if session exists and user is authenticated
  if (req.session && req.session.isAuthenticated && req.session.userId) {
    console.log('User authenticated, proceeding to route');
    next();
  } else {
    console.log('Authentication failed, returning 401');
    res.status(401).json({ message: "Unauthorized. Please log in to continue." });
  }
};