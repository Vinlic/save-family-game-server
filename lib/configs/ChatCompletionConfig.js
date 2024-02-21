import _ from 'lodash';

/**
 * @typedef {Object} ProxyAgent
 * @property {boolean} enable 是否启用
 * @property {string} protocol 协议类型
 * @property {string} host 代理服务主机地址
 * @property {number} port 代理服务主机端口号
 */

export default class ChatCompletionConfig {

    /** @type {string} 驱动名称 */
    driver;
    /** @type {string} 调用地址 */
    url;
    /** @type {string} API密钥 */
    apiKey;
    /** @type {string} API版本号 */
    apiVersion;
    /** @type {string} 模型名称 */
    model;
    /** @type {number} 上下文长度 */
    contextLength;
    /** @type {number} 并行请求数 */
    concurrencyLimit;
    /** @type {number} 等待响应超时时间（毫秒） */
    waitReponseTimeout;
    /** @type {ProxyAgent | null} 网络代理 */
    proxyAgent;

    constructor(options) {
        const { driver, url, apiKey, apiVersion, model, contextLength, concurrencyLimit, waitReponseTimeout, proxyAgent } = options || {};
        this.driver = _.defaultTo(driver, 'zhipuai');
        this.url = _.defaultTo(url, 'https://open.bigmodel.cn/api/paas/v4/chat/completions');
        this.apiKey = _.defaultTo(apiKey, '');
        this.apiVersion = _.defaultTo(apiVersion, '');
        this.model = _.defaultTo(model, 'glm-4');
        this.contextLength = _.defaultTo(contextLength, 131072);
        this.concurrencyLimit = _.defaultTo(concurrencyLimit, 100);
        this.waitReponseTimeout = _.defaultTo(waitReponseTimeout, 30000);
        this.proxyAgent = _.defaultTo(proxyAgent, null);
    }

    static create(value) {
        return ChatCompletionConfig.isInstance(value) ? value : new ChatCompletionConfig(value);
    }

    static isInstance(value) {
        return value instanceof ChatCompletionConfig;
    }

}