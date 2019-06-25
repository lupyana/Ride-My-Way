// get an instance of the express Router
import express from 'express';
import cors from 'cors';
import User from '../controllers/UserController';

const authRoutes = express.Router();
authRoutes.use(cors());
authRoutes.options('*', cors()); //
/**
 * @swagger
 *
 * /api/vi/register:
 *   post:
 *     tags:
 *       - "User"
 *     summary: "Add a new user"
 *     description: register user
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: fname
 *         description: User's first name.
 *         in: formData
 *         required: true
 *         type: string
 *       - name: lname
 *         description: User's last name.
 *         in: formData
 *         required: true
 *         type: string
 *       - name: email
 *         description: User's email.
 *         in: formData
 *         required: true
 *         type: string
 *       - name: password
 *         description: User's password.
 *         in: formData
 *         required: true
 *         type: string
 *     responses:
 *       201:
 *         description: User has been registerd, code sent to email for verification
 *       400:
 *         description: Missing parameters
 */

authRoutes.post('/auth/register', User.register);

/**
 * @swagger
 *
 * /api/vi/verify:
 *   post:
 *     tags:
 *       - "User"
 *     summary: "Verify registered user"
 *     description: verify registerd user
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: code
 *         description: Code sent via email.
 *         in: formData
 *         required: true
 *         type: integer
 *       - name: user_id
 *         description: User's id.
 *         in: formData
 *         required: true
 *         type: integer
 *     responses:
 *       200:
 *         description: User redirected to login screen
 *       400:
 *         description: Missing parameters
 *       404:
 *         description: Token mismatch
 */
authRoutes.post('/auth/verify', User.verify);

/**
 * @swagger
 *
 * /api/vi/login:
 *   post:
 *     tags:
 *       - "User"
 *     summary: "User login"
 *     description: Login to the application
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: email
 *         description: Users email.
 *         in: formData
 *         required: true
 *         type: string
 *       - name: password
 *         description: User's password.
 *         in: formData
 *         required: true
 *         type: string
 *     responses:
 *       200:
 *         description:  User is authenticated, provided jwt token to be uses in all future requests and user object is returned
 *       400:
 *           description: User doesnot exist or password mismatch
 */
authRoutes.post('/auth/login', User.login);

export default authRoutes;
