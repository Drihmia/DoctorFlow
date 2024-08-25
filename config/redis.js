import { createClient } from 'redis';

const redisClient = createClient();

redisClient.on('error', (err) => {
  console.error('Redis client error:', err);
});

redisClient.on('ready', () => {
  console.log('Connected to Redis');
});

module.exports = redisClient;
