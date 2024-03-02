import assert from 'assert';

import _ from 'lodash';

import Request from '@/lib/request/Request.ts';
import user from '@/api/controllers/user.ts';

export default {

    prefix: '/user',

    post: {
        
        '/register': async (request: Request) => {
            const { username } = request.body;
            request.validate('body.username', _.isString);
            const ticket = await user.createTicket({
                username,
                ipAddress: request.remoteIP
            });
            return ticket;
        },

    }

}