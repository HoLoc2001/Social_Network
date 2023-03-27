const Redis = require("ioredis");
const redis = new Redis(process.env.REDIS_URL);

redis.ping().then((result) => {
  if (result === "PONG") {
    console.log("Connected to the redis");
  }
});

// redis.get("mykey", (err, result) => {
//   if (err) {
//     console.error(err);
//   } else {
//     console.log(result); // Prints "value"
//   }
// });

module.exports = redis;
