import redisClient from '../config/redis';

class RedisUtils {
  static async set(key, value, duration) {
    try {
      const settedValue = await redisClient.set(key, value, 'EX', duration);
      return settedValue;
    } catch (err) {
      console.error('Error setting Redis key:', err);
      throw err;
    }
  }

  static async get(key) {
    try {
      const reply = await redisClient.get(key);
      return reply;
    } catch (err) {
      console.error('Error getting Redis key:', err);
      throw err;
    }
  }

  static async del(key) {
    try {
      const reply = await redisClient.del(key);
      return reply;
    } catch (err) {
      console.error('Error deleting Redis key:', err);
      throw err;
    }
  }
}

export default RedisUtils;
