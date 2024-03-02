import path from 'path';

import fs from 'fs-extra';
import yaml from 'yaml';
import _ from 'lodash';

import environment from '../environment.ts';

const CONFIG_PATH = path.join(path.resolve(), 'configs/', environment.env, "/redis.yml");

/**
 * Redis配置
 */
export class RedisConfig {

    /** Redis主机地址 */
    host: string;
    /** Redis主机端口号 */
    port: number;
    /** Redis服务密码 */
    password?: string;
    /** Redis主节点名称 */
    name?: string;
    /** Redis哨兵节点设置 */
    sentinels?: any[];
    /** 是否懒链接 */
    lazyConnect: boolean;
    /** 哨兵重试超时时间 */
    sentinelRetryTimeout?: number;
    /** 连接数据库序号 */
    db: number;

    constructor(options?: any) {
        const { host, port, password, name, sentinels, lazyConnect, sentinelRetryTimeout, db } = options || {};
        this.host = _.defaultTo(host, '127.0.0.1');
        this.port = _.defaultTo(port, 6379);
        this.password = password;
        this.name = name;
        this.sentinels = sentinels;
        this.lazyConnect = _.defaultTo(lazyConnect, false);
        this.sentinelRetryTimeout = _.defaultTo(sentinelRetryTimeout, 100);
        this.db = _.defaultTo(db, 0);
    }

    static load() {
        if(!fs.pathExistsSync(CONFIG_PATH)) return new RedisConfig();
        const data = yaml.parse(fs.readFileSync(CONFIG_PATH).toString());
        return new RedisConfig(data);
    }

}

export default RedisConfig.load();