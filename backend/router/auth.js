// get an instance of the express Router
import express from 'express';
import User from '../controllers/UserController';

const authRoutes = express.Router();
// User routes
authRoutes.post('/auth/register', User.register);
authRoutes.post('/auth/verify', User.verify);
authRoutes.post('/auth/login', User.login);

export default authRoutes;
