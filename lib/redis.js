import IORedis from "ioredis";

import config from "./config.js";

class Redis extends IORedis {

    constructor() {
        super({
            ...config.redis,
            sentinelRetryStrategy: times => Math.min(times * config.redis.sentinelRetryTimeout || 100, 10000)
        });
    }

}

export default new Redis();