import redis from 'redis';

/**
 * Redis client instance.
 * @type {RedisClient}
 */
const client = redis.createClient();

client.on('connect', () => {
    console.log('Redis client connected to the server')
});

client.on('error', (err) => {
    console.log('Redis client not connected to the server: ' + err)
});
