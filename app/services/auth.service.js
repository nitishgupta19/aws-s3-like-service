import db from '../config/database';

class AuthService {
  constructor() {}

  signup = (data) => {
    return db('user').insert(data);
  };

  getUserDetailByEmail = (email) => {
    return db('user').select('*').where('vEmail', email);
  };

  getUserDetailById = (id) => {
    return db('user').select('*').where('iUserId', id);
  };

  updateUserAccessKey = (id, accessKey) => {
    return db('user').select('*').where('iUserId', '=', id).update({
      vAccessKey: accessKey,
    });
  };
}

export default new AuthService();
