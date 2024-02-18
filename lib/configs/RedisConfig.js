import path from 'path';

import fs from 'fs-extra';
import beautify from 'json-beautify';
import _ from 'lodash';

import environment from '../environment.js';

const CONFIG_PATH = path.join(path.resolve(), 'configs/', environment.env, "/redis.json");

/**
 * Redis配置
 */
export default class RedisConfig {

    host;
    port;
    password;
    name;
    sentinels;
    lazyConnect;
    sentinelRetryTimeout;
    db;

    constructor(options = {}) {
        const { host, port, password, name, sentinels, lazyConnect, sentinelRetryTimeout, db } = options;
        this.host = _.defaultTo(host, '127.0.0.1');
        this.port = _.defaultTo(port, 6379);
        this.password = password;
        this.name = name;
        this.sentinels = sentinels;
        this.lazyConnect = lazyConnect;
        this.sentinelRetryTimeout = sentinelRetryTimeout;
        this.db = db;
    }

    async save(filePath) {
        filePath = filePath || CONFIG_PATH;
        await fs.ensureDir(path.dirname(filePath));
        await fs.writeFile(filePath, beautify(this, null, 4));
    }

    static load(filePath) {
        filePath = filePath || CONFIG_PATH;
        if(!fs.pathExistsSync(filePath)) return new RedisConfig();
        const data = fs.readJSONSync(filePath);
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