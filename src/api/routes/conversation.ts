import Request from '@/lib/request/Request.ts';
import conversation from '@/api/controllers/conversation.ts';
import user from '@/api/controllers/ticket.ts';
import chat from '@/lib/chat.ts';
import util from '@/lib/util.ts';
import Conversation from '../models/Conversation.ts';

export default {
    
    prefix: '/conversation',

    get: {
        
        '/query': async (request: Request) => {
            const ticket = await user.checkTicket(request);
            const conv = await Conversation.load('690683c1-db08-11ee-b099-6714f2f2611d');
            // await chat.completions();
            return conv;
        }

    },

    post: {

        '/create': async (request: Request) => {
            const ticket = await user.checkTicket(request);
            const conv = await conversation.create({
                type: '',
                name: '测试',
                fromTicketId: ticket.ticketId
            });
            // await chat.completions();
            return conv;
        }

    }

}