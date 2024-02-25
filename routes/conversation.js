import util from '../lib/util.js';

export default {
    
    prefix: '/conversation',

    get: {
        
        
    },

    post: {
        
        '/create': async ctx => {
            const conversationId = util.uuid();
            
        }

    }

}