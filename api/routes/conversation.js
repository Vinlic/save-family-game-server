import Request from '../../lib/request/Request.js';
import conversation from '../controllers/conversation.js';
import user from '../controllers/user.js';
import util from '../../lib/util.js';

export default {
    
    prefix: '/conversation',

    get: {
        
        
    },

    post: {

        '/create': async request => {
            const ticket = await user.checkTicket(request);
            conversation.create({
                ticketId: ticket.id
            });
        }

    }

}