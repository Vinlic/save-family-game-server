import _ from 'lodash';

import Request from '@/lib/request/Request.ts';
import conversation from '@/api/controllers/conversation.ts';
import auth from '@/api/controllers/auth.ts';

export default {
    
    prefix: '/conversation',

    get: {

        '/:id': async (request: Request) => {
            await auth.checkTicket(request);
            request.validate('params.id', _.isString);
            const { id: convId } = request.params;
            const conv = await conversation.query(convId);
            return conv;
        }

    },

    post: {

        '/create': async (request: Request) => {
            const ticket = await auth.checkTicket(request);
            request.validate('body.sceneId', _.isString);
            const { sceneId } = request.body;
            const conv = await conversation.create({
                sceneId,
                fromTicketId: ticket.id
            });
            return conv;
        },

        '/:id/completion': async (request: Request) => {
            await auth.checkTicket(request);
            request.validate('body.content', _.isString);
            const { content } = request.body;

        }

    }

}