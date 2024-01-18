/* eslint-disable import/no-named-as-default-member */
/* eslint-disable import/no-named-as-default */
import { Router } from 'express';
import AuthController from './auth.controller';
import createAuthenticationSchema from '../../validations/entity.validation';

const router = Router();

// Api endpoint to register user
router.post('/signup', createAuthenticationSchema, AuthController.signup);

// Api endpoint to login user
router.post('/login', createAuthenticationSchema, AuthController.login);

export default router;
