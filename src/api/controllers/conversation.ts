import type IConversation from '@/api/interfaces/IConversation.ts';
import Conversation from '@/api/models/Conversation.ts';
import redis from '@/lib/redis.ts';
import Message from '../models/Message.ts';

export default {

    async create(options: IConversation) {
        const conv = new Conversation(options);
        conv.messages.push(new Message({
            type: 'self',
            roleAvatarResId: 'image',
            roleName: '测试',
            content: '内容'
        }));
        await conv.save();
        return conv;
    }

}