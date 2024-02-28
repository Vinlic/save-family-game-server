import ServiceConfig from './configs/ServiceConfig.ts';
import SystemConfig from './configs/SystemConfig.ts';
import APIConfig from './configs/APIConfig.ts';
import RedisConfig from './configs/RedisConfig.ts';

class Config {
    
    /** 服务配置 */
    service: ServiceConfig;
    /** 系统配置 */
    system: SystemConfig;
    /** API配置 */
    api: APIConfig;
    /** Redis配置 */
    redis: RedisConfig;

    constructor(options: any = {}) {
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