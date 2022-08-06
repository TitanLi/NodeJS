const redis = require("redis");
const client = redis.createClient(6379, '192.168.2.94', { no_ready_check: true });
// client.set("key", "value", redis.print);

// LREM languages -1 python
// LRANGE languages 0 -1
// LPUSH languages python
// LPOP languages
// client.rpush("key1", "{'a':1,'b':2}");
// client.rpush("key1", 2);
// client.rpush("key1", 1);
// client.lpop("key1", (err, value) => {
//     console.log(value);
// });
// client.lrange('key1', 0, -1, (err, value) => {
//     console.log(value);
// });
// client.lrem('key1', -1, 1, (err, value) => {
//     console.log(value);
// });
client.lrange('key1', 0, -1, (err, value) => {
    console.log(value);
});
// client.keys('*', (err, value) => {
//     console.log(value);
// });

// SADD room 1
// SPOP room
// client.sadd("key1", "member1");
// client.sadd("key1", "member2");
// client.sadd("key1", "member3");

// client.spop("key1", redis.print);