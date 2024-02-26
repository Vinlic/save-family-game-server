import { Ticket } from '../models/user.js';
import redis from '../../lib/redis.js';
import util from '../../lib/util.js';

export default {

    /**
     * 创建凭据
     * 
     * @param {Object} options 选项
     * @param {string} options.username 用户名称
     * @param {string} options.ipAddress IP地址
     */
    async createTicket(options = {}) {
        const { username, ipAddress } = options;
        const ticket = new Ticket({
            username,
            ipAddress
        });
        await redis.hmset(`ticket:${ticket.id}`, ticket);
        return ticket;
    },

    /**
     * 校验凭据
     * 
     * @param {Ticket} ticket 凭据 
     */
    async checkTicket(ticket) {
        const data = await redis.hmget(`ticket:${ticket.id}`);
        // if(!data)
        //     throw new 
        const ticket = new Ticket(data);
    }

}