import ServiceConfig from './configs/ServiceConfig.js';
import SystemConfig from './configs/SystemConfig.js';
import APIConfig from './configs/APIConfig.js';
import RedisConfig from './configs/RedisConfig.js';

class Config {

    service;
    system;
    api;
    redis;

    constructor(options = {}) {
        super();

        this.optionsInject(options, {
            service: ServiceConfig.create,
            system: SystemConfig.create,
            api: APIConfig.create,
            redis: RedisConfig.create
        }, {
            service: ServiceConfig.isInstance,
            system: SystemConfig.isInstance,
            api: APIConfig.isInstance,
            redis: RedisConfig.isInstance
        });
    }

    load() {
        this.service = ServiceConfig.load();
        this.system = SystemConfig.load();
        this.api = APIConfig.load();
        this.redis = RedisConfig.load();
        return this;
    }

    update(config = {}) {
        this.service.update(config.service);
        this.system.update(config.system);
        this.api.update(config.api);
        this.redis.update(config.redis);
    }

    async save() {
        await this.service.save();
        await this.system.save();
        await this.api.save();
        await this.redis.save();
    }

}

export default new Config().load();