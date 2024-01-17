/* eslint-disable implicit-arrow-linebreak */
/* eslint-disable import/no-named-as-default-member */
/* eslint-disable import/no-named-as-default */
/* eslint-disable linebreak-style */
/* eslint-disable import/named */
import { Router } from 'express';
import multer from 'multer';
import path from 'path';
import CloudController from './cloud.controller';

const router = Router();

router.post('/createBucket', CloudController.createBucket);

router.post('/createBucket', CloudController.createBucket);

export default router;
