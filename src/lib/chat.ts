import ZhipuAI from 'zhipuai-sdk-nodejs-v4';

import ICompletionMessage from '@/lib/interfaces/ICompletionMessage.ts';
import config from './config.ts';

class Chat {

    client: ZhipuAI

    constructor() {
        this.client = new ZhipuAI({
            apiKey: config.api.chatCompletion.apiKey
        });
    }

    async completions(messages: ICompletionMessage[]) {
        const { model } = config.api.chatCompletion;
        const result = await this.client.createCompletions({
            model,
            messages
        });
        console.log(result);
    }

}

export default new Chat();