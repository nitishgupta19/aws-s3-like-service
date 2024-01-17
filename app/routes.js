import { Router } from 'express';
import cloudRoutes from './controllers/cloudController/index';

const router = Router();

router.use('/cloud', cloudRoutes);

module.exports = router;
