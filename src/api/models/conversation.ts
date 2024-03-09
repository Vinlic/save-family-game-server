import _ from 'lodash';

import type IConversation from "@/api/interfaces/IConversation.ts";
import Message from "./Message.ts";
import redis from '@/lib/redis.ts';
import util from '@/lib/util.ts';

export default class Conversation implements IConversation {

    id: string;
    type: string;
    name: string;
    messages: Message[];
    sceneId: string;
    fromTicketId: string;
    createTime: number;

    constructor(options: IConversation) {
        this.type = options.type;
        this.id = options.id || util.uuid();
        this.name = options.name;
        this.messages = _.defaultTo(options.messages, []).map(v => new Message(v));
        this.sceneId = options.sceneId;
        this.fromTicketId = options.fromTicketId;
        this.createTime = _.defaultTo(options.createTime, util.unixTimestamp());
    }

    toCompletionMessages() {
        return this.messages.map(msg => msg.toCompletionMessage());
    }

    async save() {
        const pipeline = redis.pipeline();
        pipeline.hmset(`conv:${this.id}`, _.omit(this, 'messages'));
        pipeline.del(`msgs:${this.id}`)
        pipeline.lpush(`msgs:${this.id}`, ...this.messages.map(msg => JSON.stringify(msg)));
        await pipeline.exec();
    }

    static async load(convId: string) {
        const [convResult, msgsResults] = await Promise.all([
            redis.hmget(`conv:${convId}`, 'type', 'id', 'name', 'sceneId', 'fromTicketId'),
            redis.lrange(`msgs:${convId}`, 0, -1)
        ]);
        if(!convResult)
            return null;
        const conv = new Conversation({
            ...convResult,
            messages: msgsResults.map(result => JSON.parse(result))
        });
        return conv;
    }

}