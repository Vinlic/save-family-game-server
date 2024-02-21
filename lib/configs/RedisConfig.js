import path from 'path';

import fs from 'fs-extra';
import yaml from 'yaml';
import _ from 'lodash';

import environment from '../environment.js';

const CONFIG_PATH = path.join(path.resolve(), 'configs/', environment.env, "/redis.yml");

/**
 * Redis配置
 */
export default class RedisConfig {

    /** @type {string} Redis主机地址 */
    host;
    /** @type {number} Redis主机端口号 */
    port;
    /** @type {string} Redis服务密码 */
    password;
    /** @type {string} Redis主节点名称 */
    name;
    /** @type {Array} Redis哨兵节点设置 */
    sentinels;
    /** @type {boolean} 是否懒链接 */
    lazyConnect;
    /** @type {number} 哨兵重试超时时间 */
    sentinelRetryTimeout;
    /** @type {number} 连接数据库序号 */
    db;

    constructor(options) {
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

    static load(filePath) {
        filePath = filePath || CONFIG_PATH;
        if(!fs.pathExistsSync(filePath)) return new RedisConfig();
        const data = yaml.parse(fs.readFileSync(filePath).toString());
        return new RedisConfig(data);
    }

    static create(value) {
        if(_.isUndefined(value)) return value;
        return RedisConfig.isInstance(value) ? value : new RedisConfig(value);
    }

    static isInstance(value) {
        return value instanceof RedisConfig;
    }

}