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
            const { ticket } = request.body;
            await user.checkTicket();
            conversation.create({
                ipAddress: request.remoteIP
            });
        }

    }

}