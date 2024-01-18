/* eslint-disable implicit-arrow-linebreak */
/* eslint-disable import/no-named-as-default-member */
/* eslint-disable import/no-named-as-default */
/* eslint-disable linebreak-style */
/* eslint-disable import/named */
import { Router } from 'express';
import multer from 'multer';
import path from 'path';

import authMiddeleware from '../../middlewares/auth.middleware';
import CloudController from './cloud.controller';

const router = Router();

// Create Bucket/Folder in Users Parent Folder
router.post('/createBucket', authMiddeleware(), CloudController.createBucket);

// Delete Bucket/Folder from users Folder
router.delete('/deleteBucket', authMiddeleware(), CloudController.deleteBucket);

// List Bucket/Folder of the User
router.post('/listBucket', authMiddeleware(), CloudController.listBucket);

// Create Object/File in Users Parent Folder
router.post('/createObject', authMiddeleware(), CloudController.createObject);

// Delete Object/File from users Folder
router.delete('/deleteObject', authMiddeleware(), CloudController.deleteObject);

// List Object/File of the User
router.post('/listObject', authMiddeleware(), CloudController.listObject);

// Detail Object/File of the User
router.get(
  '/detailObject/:objectId',
  authMiddeleware(),
  CloudController.detailObject
);

export default router;
