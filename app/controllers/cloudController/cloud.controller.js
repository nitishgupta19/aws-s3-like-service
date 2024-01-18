import fs from 'fs';
import formidable from 'formidable';
import path from 'path';
import GeneralFunctionService from '../../services/generalfunction';
import cloudService from '../../services/cloud.service';
class CloudController {
  constructor() {}

  createBucket = async (req, res, next) => {
    try {
      let folderName = '';
      let folderVolume = 0;
      if ('folderName' in req.body) {
        folderName = req.body.folderName;
        folderVolume = req.body.folderVolume ? req.body.folderVolume : 5; // volume is in GB
        const rootFolder = process.env.ROOTBUCKETFOLDER;
        const folderpath = `${rootFolder}/${req.decoded.id}/${folderName}`;

        if (!fs.existsSync(rootFolder)) {
          fs.mkdirSync(rootFolder);
        }

        if (!fs.existsSync(`${rootFolder}/${req.decoded.id}`)) {
          fs.mkdirSync(`${rootFolder}/${req.decoded.id}`);
        }

        if (!fs.existsSync(folderpath)) {
          fs.mkdirSync(folderpath);
          let bucketData = {
            vName: folderName,
            iUserId: req.decoded.id,
            iCapacity: folderVolume,
            iUtilised: 0,
            dtCreatedAt: await GeneralFunctionService.getCurrentDateTime(),
            dtModifiedAt: await GeneralFunctionService.getCurrentDateTime(),
          };

          const result = await cloudService.createBucket(bucketData);

          res.status(200).json({
            success: 1,
            message: 'Bucket Created',
          });
        } else {
          res.status(400).json({
            success: 0,
            message: 'Bucket Already Exist',
          });
        }
      } else {
        res.status(400).json({
          success: 0,
          message: 'Please provide the required details',
        });
      }
    } catch (error) {
      console.log('Error', error);
      res.status(500).json({
        success: 0,
        message: 'Something went wrong',
      });
    }
  };

  // Delete Bucket on user Request
  deleteBucket = async (req, res, next) => {
    try {
      const bucketDetails = await cloudService.getBucketDetailById(req.body.id);
      if (bucketDetails.length) {
        let folderName = bucketDetails[0].vName;
        const rootFolder = process.env.ROOTBUCKETFOLDER;
        const folderpath = `${rootFolder}/${req.decoded.id}/${folderName}`;
        const result = await cloudService.deleteBucket(
          bucketDetails[0].iUserBucketId
        );
        if (!fs.existsSync(rootFolder)) {
          res.status(400).json({
            success: 0,
            message: 'Bucket Parent folder not found',
          });
        }

        if (!fs.existsSync(folderpath)) {
          res.status(400).json({
            success: 0,
            message: 'Bucket Not Found',
          });
        } else {
          fs.rmdirSync(folderpath);
          res.status(200).json({
            success: 1,
            message: 'Bucket Deleted',
          });
        }
      } else {
        res.status(400).json({
          success: 0,
          message: 'Bucket Not Found',
        });
      }
    } catch (error) {
      console.log('Error', error);
      res.status(500).json({
        success: 0,
        message: 'Something went wrong',
      });
    }
  };

  // List Bucket of the given User
  listBucket = async (req, res, next) => {
    try {
      const pageSize = req.body.limit || 1; // Number of items per page
      const pageNumber = req.body.page || 1; // Page number, starting from 1

      const offset = (pageNumber - 1) * pageSize;
      const result = await cloudService.getBucketDetailByUserId(
        req.decoded.id,
        pageSize,
        offset
      );

      res.status(200).json({
        success: 1,
        message: 'Bucket List',
        data: result,
      });
    } catch (error) {
      console.log('Error', error);
      res.status(500).json({
        success: 0,
        message: 'Something went wrong',
      });
    }
  };

  createObject = async (req, res, next) => {
    try {
      const form = formidable({});
      form.parse(req, async (err, fields, files) => {
        if (err) {
          console.log(err);
        } else {
          const bucketId = +fields.bucketId[0];
          const uploadedFile = files.file[0];

          const bucketDetails = await cloudService.getBucketDetailById(
            bucketId
          );

          if (bucketDetails.length) {
            const rootFolder = process.env.ROOTBUCKETFOLDER;
            const folderpath = `${rootFolder}/${req.decoded.id}/${bucketDetails[0].vName}`;
            if (!fs.existsSync(folderpath)) {
              res.status(400).json({
                success: 0,
                message: 'Something Went Wrong With Permission',
              });
            }
            const oldPath = uploadedFile.filepath;
            const newFileName = uploadedFile.newFilename;
            const filePath =
              path.join(folderpath, newFileName) +
              path.extname(uploadedFile.originalFilename);
            fs.copyFileSync(oldPath, filePath);
            // remove from old path
            fs.unlinkSync(oldPath);
            const uploadedFileName =
              uploadedFile.newFilename +
              path.extname(uploadedFile.originalFilename);
            let objectData = {
              vName: uploadedFileName,
              vSecretName: uploadedFile.originalFilename,
              iUserBucketId: bucketId,
              iUserId: req.decoded.id,
              vFileUrl: `${rootFolder}/${req.decoded.id}/${bucketDetails[0].vName}/${uploadedFileName}`,
              vFileType: uploadedFile.mimetype,
            };
            const result = await cloudService.createObject(objectData);
            if (result && result.length) {
              res.status(200).json({
                success: 1,
                message: 'File Uploaded Successfully',
                data: {
                  fileUrl: `${process.env.API_URL}/${rootFolder}/${req.decoded.id}/${bucketDetails[0].vName}/${uploadedFileName}`,
                },
              });
            } else {
              res.status(400).json({
                success: 0,
                message: 'Something Went Wrong',
              });
            }
          } else {
            res.status(400).json({
              success: 0,
              message: 'Bucket Details Not Found',
            });
          }
        }
      });
    } catch (error) {
      console.log('Error', error);
      res.status(500).json({
        success: 0,
        message: 'Something went wrong',
      });
    }
  };

  deleteObject = async (req, res, next) => {
    try {
    } catch (error) {
      console.log('Error', error);
      res.status(500).json({
        success: 0,
        message: 'Something went wrong',
      });
    }
  };

  listObject = async (req, res, next) => {
    try {
    } catch (error) {
      console.log('Error', error);
      res.status(500).json({
        success: 0,
        message: 'Something went wrong',
      });
    }
  };

  detailObject = async (req, res, next) => {
    try {
    } catch (error) {
      console.log('Error', error);
      res.status(500).json({
        success: 0,
        message: 'Something went wrong',
      });
    }
  };
}

export default new CloudController();
