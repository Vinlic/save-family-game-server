import path from 'path';

import fs from 'fs-extra';
import yaml from 'yaml';
import _ from 'lodash';

import environment from '../../lib/environment.js';

const CONFIG_PATH = path.join(path.resolve(), 'configs/', environment.env, "/system.yml");

/**
 * 系统配置
 */
export default class SystemConfig {

    /** @type {boolean} 是否开启请求日志 */
    requestLog;
    /** @type {string} 临时目录路径 */
    tmpDir;
    /** @type {string} 日志目录路径 */
    logDir;
    /** @type {string} 日志写入间隔（毫秒） */
    logWriteInterval;
    /** @type {number} 日志文件有效期（毫秒） */
    logFileExpires;
    /** @type {string} 公共目录路径 */
    publicDir;
    /** @type {number} 临时文件有效期（毫秒） */
    tmpFileExpires;
    /** @type {Object} 请求体配置 */
    requestBody;

    constructor(options) {
        const { requestLog, tmpDir, logDir, logWriteInterval, logFileExpires, publicDir, tmpFileExpires, requestBody } = options || {};
        this.requestLog = _.defaultTo(requestLog, false);
        this.tmpDir = _.defaultTo(tmpDir, './tmp');
        this.logDir = _.defaultTo(logDir, './logs');
        this.logWriteInterval = _.defaultTo(logWriteInterval, 200);
        this.logFileExpires = _.defaultTo(logFileExpires, 2626560000);
        this.publicDir = _.defaultTo(publicDir, './public');
        this.tmpFileExpires = _.defaultTo(tmpFileExpires, 86400000);
        this.requestBody = Object.assign(requestBody || {}, {
            enableTypes: ['json', 'form', 'text', 'xml'],
            encoding: 'utf-8',
            formLimit: '10mb',
            jsonLimit: '10mb',
            textLimit: '10mb',
            xmlLimit: '10mb',
            formidable: {
                maxFileSize: '30mb'
            },
            multipart: true,
            parsedMethods: ['POST', 'PUT', 'PATCH']
        });
    }

    get rootDirPath() {
        return path.resolve();
    }

    get tmpDirPath() {
        return path.resolve(this.tmpDir);
    }

    get logDirPath() {
        return path.resolve(this.logDir);
    }

    get publicDirPath() {
        return path.resolve(this.publicDir);
    }

    static load(filePath) {
        filePath = filePath || CONFIG_PATH;
        if (!fs.pathExistsSync(filePath)) return new SystemConfig();
        const data = yaml.parse(fs.readFileSync(filePath).toString());
        return new SystemConfig(data);
    }

    static create(value) {
        if (_.isUndefined(value)) return value;
        return SystemConfig.isInstance(value) ? value : new SystemConfig(value);
    }

    static isInstance(value) {
        return value instanceof SystemConfig;
    }

}