import jwtwebtoken from 'jsonwebtoken';
import AuthService from '../../services/auth.service';
import GeneralFunctionService from '../../services/generalfunction';
const bcrypt = require('bcryptjs');

class AuthController {
  constructor(authService) {
    this.AuthService = authService;
  }
  signup = async (req, res) => {
    try {
      const data = req.body;
      console.log(data);
      let result;

      bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(data.password, salt, async (err, hash) => {
          if (err) {
            return res
              .status(500)
              .json({ error: 'Error while encrypting password' });
          }

          let userDetails = {
            vName: data.name,
            dtCreatedAt: await GeneralFunctionService.getCurrentDateTime(),
            dtModifiedAt: await GeneralFunctionService.getCurrentDateTime(),
            eStatus: 'Active',
            vEmail: data.email,
            vPassword: hash,
          };

          result = await AuthService.signup(userDetails);

          if (result) {
            res.status(200).json({
              success: 1,
              message: 'User registered successfully',
            });
          } else {
            res.status(200).json({
              success: 0,
              message: 'Something went wrong, please try again',
              data: {},
            });
          }
        });
      });
    } catch (err) {
      res.status(500).json({
        success: 0,
        message: err.code,
      });
    }
  };

  login = async (req, res, next) => {
    try {
      const loginDetails = req.body;
      let date = new Date();
      let getUserDetailByEmail = await AuthService.getUserDetailByEmail(
        loginDetails.email
      );
      if (getUserDetailByEmail && getUserDetailByEmail.length) {
        bcrypt.compare(
          loginDetails.password,
          getUserDetailByEmail[0].vPassword,
          async (err, isMatch) => {
            if (!isMatch) {
              res.status(200).json({
                success: 0,
                message: 'Invalid credential',
              });
            } else {
              let accessKey =
                Math.floor(Math.random() * 1000000 + 1) +
                '_mysecret_' +
                date.getTime();

              await AuthService.updateUserAccessKey(
                getUserDetailByEmail[0].iUserId,
                accessKey
              );

              let getUserDetailById = await AuthService.getUserDetailById(
                getUserDetailByEmail[0].iUserId
              );
              let jwtSecretKey = process.env.JWT_SECRET;

              let tokendata = {
                id: getUserDetailById[0].iUserId,
                email: getUserDetailById[0].vEmail,
                firstName: getUserDetailById[0].vName,
                status: getUserDetailById[0].eStatus,
                access_key: getUserDetailById[0].vAccessKey,
              };

              const token = jwtwebtoken.sign(tokendata, jwtSecretKey);
              let response = tokendata;
              response.access_token = token;

              res.status(200).json({
                success: 1,
                message: 'User logged in successfully',
                data: {
                  token: token,
                },
              });
            }
          }
        );
      } else {
        res.status(200).json({
          success: 0,
          message: 'No user found',
        });
      }
    } catch (err) {
      // next(err);
      res.status(500).json({
        success: 0,
        message: err.message || 'Something went wrong with password update',
      });
    }
  };
}
export default new AuthController(AuthService);
