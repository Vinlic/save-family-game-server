import _ from 'lodash';

import IMessage from '@/api/interfaces/IMessage.ts';
import ICompletionMessage from '@/lib/interfaces/ICompletionMessage.ts';
import util from '@/lib/util.ts';

export default class Message implements IMessage {

    type: 'text' | 'image' | 'event' | 'message';
    id: string;
    role?: 'self' | 'other' | 'liar';
    roleName?: string;
    content: string;
    event?: string;
    timeout: number;
    createTime?: number;

    constructor(options: IMessage) {
        this.type = _.defaultTo(options.type, 'text');
        this.id = _.defaultTo(options.id, util.uuid());
        this.role = options.role;
        this.roleName = options.roleName;
        this.content = options.content;
        this.event = options.event;
        this.timeout = _.defaultTo(options.timeout, 500);
        this.createTime = _.defaultTo(options.createTime, util.unixTimestamp());
    }

    toCompletionMessage(): ICompletionMessage {
        return {
            role: 'user',
            content: this.content
        }
    }

}