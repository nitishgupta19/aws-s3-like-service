/* eslint-disable import/no-named-as-default-member */
/* eslint-disable import/no-named-as-default */
import { Router } from 'express';
import AuthController from './auth.controller';
import createAuthenticationSchema from '../../validations/entity.validation';

const router = Router();

router.post('/signup', createAuthenticationSchema, AuthController.signup);
router.post('/login', createAuthenticationSchema, AuthController.login);
router.post('/logout', AuthController.logout);

export default router;
