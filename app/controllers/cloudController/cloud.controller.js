import fs from 'fs';

class CloudController {
  constructor() {}

  createBucket = async (req, res, next) => {
    try {
      let folderName = '';
      let folderVolume = 0;
      if ('folderName' in req.body) {
        folderName = req.body.folderName;
        folderVolume = req.body.folderVolume ? req.body.folderVolume : 5; // volume is in GB
        console.log(process.env.ROOTBUCKETFOLDER);
        const rootFolder = process.env.ROOTBUCKETFOLDER;
        const folderpath = `${rootFolder}/${folderName}`;

        if (!fs.existsSync(rootFolder)) {
          fs.mkdirSync(rootFolder);
        }

        if (!fs.existsSync(folderpath)) {
          fs.mkdirSync(folderpath);
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
      // check bucket belong to that user
      // Bucket exist
      // Delete the Bucket
      if ('folderName' in req.body) {
        let folderName = req.body.folderName;
        console.log(process.env.ROOTBUCKETFOLDER);
        const rootFolder = process.env.ROOTBUCKETFOLDER;
        const folderpath = `${rootFolder}/${folderName}`;

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
}

export default new CloudController();
