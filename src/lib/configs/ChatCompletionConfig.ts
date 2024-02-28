import _ from 'lodash';

interface ProxyAgent {
    enable?: boolean;
    protocol?: string;
    host?: string;
    port?: number;
}

export default class ChatCompletionConfig {

    /** 驱动名称 */
    driver: string;
    /** 调用地址 */
    url: string;
    /** API密钥 */
    apiKey: string;
    /** API版本号 */
    apiVersion: string;
    /** 模型名称 */
    model: string;
    /** 上下文长度 */
    contextLength: number;
    /** 并行请求数 */
    concurrencyLimit: number;
    /** 等待响应超时时间（毫秒） */
    waitReponseTimeout: number;
    /** 网络代理 */
    proxyAgent: ProxyAgent | null;

    constructor(options?: any) {
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