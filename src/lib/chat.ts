import ZhipuAI from 'zhipuai-sdk-nodejs-v4';

import config from './config.ts';

class Chat {

    client: ZhipuAI

    constructor() {
        this.client = new ZhipuAI({
            apiKey: config.api.chatCompletion.apiKey
        });
    }

    async completions() {
        const { model } = config.api.chatCompletion;
        const result = await this.client.createCompletions({
            model,
            messages: [
                {
                    'role': 'user',
                    'content': '你好'
                }
            ]
        });
        console.log(result);
    }

}

export default new Chat();