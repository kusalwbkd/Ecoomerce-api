import { Router } from 'express';
import { createUser, loginUser } from '../controllers/UserController.js';
import { validateData } from '../middlewares/validationMiddleware.js';
import { createUserSchema, loginSchema } from '../db/UserSchema.js';

const router = Router();
router.route('/register').post(validateData(createUserSchema),createUser)
router.route('/login').post(validateData(loginSchema),loginUser)

export default router