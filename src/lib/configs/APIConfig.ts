import path from 'path';

import fs from 'fs-extra';
import yaml from 'yaml';
import _ from 'lodash';

import ChatCompletionConfig from './ChatCompletionConfig.ts';
import environment from '../environment.ts';

const CONFIG_PATH = path.join(path.resolve(), 'configs/', environment.env, "/api.yml");

/**
 * API配置
 */
export default class APIConfig {

    /** 聊天补全配置 */
    chatCompletion: ChatCompletionConfig;

    constructor(options?: any) {
        const { chatCompletion } = options || {};
        this.chatCompletion = ChatCompletionConfig.create(chatCompletion);
    }

    static load(filePath?: string) {
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