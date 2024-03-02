import { Redis as IORedis } from "ioredis";

import config from "./config.ts";

class Redis extends IORedis {

    constructor() {
        super({
            ...config.redis,
            sentinelRetryStrategy: times => Math.min(times * config.redis.sentinelRetryTimeout || 100, 10000)
        });
    }

    async hmget(key: string, ...fields: any[]): Promise<any> {
        if(!await super.exists(key))
            return null;
        const values = await super.hmget(key, ...fields);
        return Object.fromEntries(fields.map((field, index) => [field, values[index]]));
    }

}

export default new Redis();