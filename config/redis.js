import { createClient } from 'redis';

const redisClient = createClient();
const connectRedis = async (redisClient) => {
  redisClient.on('error', (err) => {
    console.error('Redis client error:', err);
  });

  redisClient.on('ready', () => {
    console.log('Redis client ready');
  });

  redisClient.on('end', () => {
    console.log('Disconnected from Redis');
  });

  redisClient.on('reconnecting', () => {
    console.log('Reconnecting to Redis');
  });

  redisClient.on('connect', () => {
    console.log('Connected to Redis');
  });
  await redisClient.connect();
};
connectRedis(redisClient);
export default redisClient;
