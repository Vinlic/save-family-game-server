import Request from '@/lib/request/Request.ts';
import conversation from '@/api/controllers/conversation.ts';
import user from '@/api/controllers/user.ts';
import util from '@/lib/util.ts';

export default {
    
    prefix: '/conversation',

    get: {
        
        
    },

    post: {

        '/create': async (request: Request) => {
            const ticket = await user.checkTicket(request);
            conversation.create({
                ticketId: ticket.id
            });
        }

    }

}