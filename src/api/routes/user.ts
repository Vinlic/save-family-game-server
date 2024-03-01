import user from '@/api/controllers/user.ts';

export default {

    prefix: '/user',

    post: {
        
        '/register': async request => {
            const { username } = request.body;
            const ticket = await user.createTicket({
                username,
                ipAddress: request.remoteIP
            });
            return ticket;
        },

        

    }

}