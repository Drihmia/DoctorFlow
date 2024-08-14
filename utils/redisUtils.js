import redisClient from '../config/redis';

class RedisUtils {
  async set(key, value, duration) {
    return new Promise((resolve, reject) => {
      if (duration) {
        redisClient.set(key, value, 'EX', duration, (err, reply) => {
          if (err) reject(err);
          resolve(reply);
        });
      } else {
        redisClient.set(key, value, (err, reply) => {
          if (err) reject(err);
          resolve(reply);
        });
      }
    });
  }

  async get(key) {
    return new Promise((resolve, reject) => {
      redisClient.get(key, (err, reply) => {
        if (err) reject(err);
        resolve(reply);
      });
    });
  }

  async del(key) {
    return new Promise((resolve, reject) => {
      redisClient.del(key, (err, reply) => {
        if (err) reject(err);
        resolve(reply);
      });
    });
  }
}

const redisUtils = new RedisUtils();
export default redisUtils;
