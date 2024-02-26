import Request from '../lib/request/Request.js';
import conversation from '../controllers/conversation.js';
import util from '../lib/util.js';

export default {
    
    prefix: '/conversation',

    get: {
        
        
    },

    post: {

        '/create': async request => {
            const { ticket } = request.body;

            conversation.create({
                ipAddress: request.remoteIP
            });
        }

    }

}