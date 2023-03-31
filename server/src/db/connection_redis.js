const Redis = require("ioredis");
try {
  const redis = new Redis(process.env.REDIS_URL);

  redis.ping().then((result) => {
    if (result === "PONG") {
      console.log("Connected to the redis");
    }
  });

  module.exports = redis;
} catch (error) {}
