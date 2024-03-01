import path from 'path';

import fs from 'fs-extra';
import yaml from 'yaml';
import _ from 'lodash';

import environment from '../environment.ts';

const CONFIG_PATH = path.join(path.resolve(), 'configs/', environment.env, "/system.yml");

/**
 * 系统配置
 */
export default class SystemConfig {

    /** 是否开启请求日志 */
    requestLog: boolean;
    /** 临时目录路径 */
    tmpDir: string;
    /** 日志目录路径 */
    logDir: string;
    /** 日志写入间隔（毫秒） */
    logWriteInterval: number;
    /** 日志文件有效期（毫秒） */
    logFileExpires: number;
    /** 公共目录路径 */
    publicDir: string;
    /** 临时文件有效期（毫秒） */
    tmpFileExpires: number;
    /** 请求体配置 */
    requestBody: any;
    /** 是否调试模式 */
    debug: boolean;

    constructor(options?: any) {
        const { requestLog, tmpDir, logDir, logWriteInterval, logFileExpires, publicDir, tmpFileExpires, requestBody, debug } = options || {};
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
        this.debug = _.defaultTo(debug, true);
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

    static load(filePath?: string) {
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