import db from '../config/database';

class CloudService {
  constructor() {}

  createBucket = (data) => {
    return db('user_bucket').insert(data);
  };

  createObject = (data) => {
    return db('bucket_object').insert(data);
  };

  deleteBucket = (id) => {
    return db('user_bucket').where('iUserBucketId', id).del();
  };

  deleteObject = (id) => {
    return db('bucket_object').where('iBucketObjectId', id).del();
  };

  getBucketDetailById = (id) => {
    return db('user_bucket').select('*').where('iUserBucketId', id);
  };

  getObjectDetailById = (id) => {
    return db('bucket_object').select('*').where('iBucketObjectId', id);
  };

  getBucketDetailByUserId = (id, pageSize, offset) => {
    return db('user_bucket')
      .select('*')
      .where('iUserId', id)
      .limit(pageSize)
      .offset(offset);
  };

  getObjectListByUserId = (userId, pageSize, offset) => {
    return db('bucket_object')
      .select('*')
      .where('iUserId', userId)
      .limit(pageSize)
      .offset(offset);
  };

  getObjectListByBucketId = (bucketId, pageSize, offset) => {
    return db('bucket_object')
      .select('*')
      .where('iUserBucketId', bucketId)
      .limit(pageSize)
      .offset(offset);
  };
}

export default new CloudService();
