import assert from 'assert';

import _ from 'lodash';

import Request from '@/lib/request/Request.ts';
import ticket from '@/api/controllers/ticket.ts';

export default {

    prefix: '/ticket',

    post: {
        
        '/create': async (request: Request) => {
            const { username } = request.body;
            request.validate('body.username', _.isString);
            const _ticket = await ticket.createTicket({
                username,
                ipAddress: request.remoteIP
            });
            return _ticket.toMaskedData();
        },

    }

}