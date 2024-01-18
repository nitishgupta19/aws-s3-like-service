import { Router } from 'express';
import authRoutes from './controllers/authController';
import cloudRoutes from './controllers/cloudController/index';

const router = Router();

router.use('/auth', authRoutes);
router.use('/cloud', cloudRoutes);

module.exports = router;
