import path from 'path';

import fs from 'fs-extra';
import yaml from 'yaml';
import _ from 'lodash';

import ChatCompletionConfig from './ChatCompletionConfig.js';
import environment from '../environment.js';

const CONFIG_PATH = path.join(path.resolve(), 'configs/', environment.env, "/api.yml");

/**
 * API配置
 */
export default class APIConfig {

    /** @type {ChatCompletionConfig} 聊天补全配置 */
    chatCompletion;

    constructor(options) {
        const { chatCompletion } = options || {};
        this.chatCompletion = ChatCompletionConfig.create(chatCompletion);
    }

    static load(filePath) {
        filePath = filePath || CONFIG_PATH;
        if(!fs.pathExistsSync(filePath)) return new APIConfig();
        const data = yaml.parse(fs.readFileSync(filePath).toString());
        return new APIConfig(data);
    }

    static create(value) {
        if(_.isUndefined(value)) return value;
        return APIConfig.isInstance(value) ? value : new APIConfig(value);
    }

    static isInstance(value) {
        return value instanceof APIConfig;
    }

}