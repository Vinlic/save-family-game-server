import ServiceConfig from './configs/ServiceConfig.js';
import SystemConfig from './configs/SystemConfig.js';
import APIConfig from './configs/APIConfig.js';
import RedisConfig from './configs/RedisConfig.js';

class Config {
    
    /** @type {ServiceConfig} 服务配置 */
    service;
    /** @type {SystemConfig} 系统配置 */
    system;
    /** @type {APIConfig} API配置 */
    api;
    /** @type {RedisConfig} Redis配置 */
    redis;

    constructor(options = {}) {
        const { service, system, api, redis } = options;
        this.service = ServiceConfig.create(service);
        this.system = SystemConfig.create(system);
        this.api = APIConfig.create(api);
        this.redis = RedisConfig.create(redis);
    }

    load() {
        this.service = ServiceConfig.load();
        this.system = SystemConfig.load();
        this.api = APIConfig.load();
        this.redis = RedisConfig.load();
        return this;
    }

}

export default new Config().load();