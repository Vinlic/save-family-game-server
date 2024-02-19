import path from 'path';

import fs from 'fs-extra';
import yaml from 'yaml';
import _ from 'lodash';

import environment from '../environment.js';
import util from '../util.js';

const CONFIG_PATH = path.join(path.resolve(), 'configs/', environment.env, "/service.yml");

/**
 * 服务配置
 */
export default class ServiceConfig {

    /** @property {string} 服务名称 */
    name;
    /** @property {string} 服务绑定主机地址 */
    host;
    /** @property {number} 服务绑定端口 */
    port;
    /** @property {string} 服务路由前缀 */
    urlPrefix;
    /** @property {string} 服务绑定地址（外部访问地址） */
    bindAddress;

    constructor(options = {}) {
        const { name, host, port, urlPrefix, bindAddress } = options;
        this.name = _.defaultTo(name, 'game-server');
        this.host = _.defaultTo(host, '0.0.0.0');
        this.port = _.defaultTo(port, 5566);
        this.urlPrefix = _.defaultTo(urlPrefix, '');
        this.bindAddress = bindAddress;
    }

    get addressHost() {
        if(this.bindAddress) return this.bindAddress;
        const ipAddresses = util.getIPAddressesByIPv4();
        for(let ipAddress of ipAddresses) {
            if(ipAddress === this.host)
                return ipAddress;
        }
        return ipAddresses[0] || "127.0.0.1";
    }

    get address() {
        return `${this.addressHost}:${this.port}`;
    }

    get pageDirUrl() {
        return `http://127.0.0.1:${this.port}/page`;
    }

    get publicDirUrl() {
        return `http://127.0.0.1:${this.port}/public`;
    }

    async save(filePath) {
        filePath = filePath || CONFIG_PATH;
        await fs.ensureDir(path.dirname(filePath));
        await fs.writeFile(filePath, yaml.stringify(this));
    }

    static load(filePath) {
        filePath = filePath || CONFIG_PATH;
        const external = _.pickBy(environment, (v, k) => ["name", "host", "port"].includes(k) && !_.isUndefined(v));
        if(!fs.pathExistsSync(filePath)) return new ServiceConfig(external);
        const data = yaml.parse(filePath);
        return new ServiceConfig({ ...data, ...external });
    }

    static create(value) {
        if(_.isUndefined(value)) return value;
        return ServiceConfig.isInstance(value) ? value : new ServiceConfig(value);
    }

    static isInstance(value) {
        return value instanceof ServiceConfig;
    }

}