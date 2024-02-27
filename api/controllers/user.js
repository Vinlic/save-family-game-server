import _ from 'lodash';

import { Ticket } from '../models/user.js';
import redis from '../../lib/redis.js';
import EX from '../consts/exceptions.js';
import APIException from '../../lib/exceptions/APIException.js';
import Request from '../../lib/request/Request.js';
import logger from '../../lib/logger.js';
import util from '../../lib/util.js';

const blockedIPAddresses = [];

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
        await redis.hmset(`ticket:${ticket.id}`, ticket.toRedisData());
        return ticket;
    },

    /**
     * 校验凭据
     * 
     * @param {Request} request 请求对象
     */
    async checkTicket(request) {
        const ticketId = request.headers['ticket'];
        if(!_.isString(ticketId) || !/^[a-z0-9\-]{36}$/.test(ticketId))
            throw new APIException(EX.API_TICKET_EXPIRED);
        if(blockedIPAddresses.indexOf(request.remoteIP) != -1)
            throw new APIException(EX.API_REQUEST_HAS_BLOCKED);
        let ticket = new Ticket();
        const data = await redis.hmget(`ticket:${ticketId}`, Object.keys(ticket));
        if(data == null)
            throw new APIException(EX.API_TICKET_EXPIRED);
        ticket = Ticket.parseRedisData(data);
        if(request.remoteIP && request.remoteIP != ticket.ipAddress) {
            ticket.oldIPAddresses.push(ticket.ipAddress);
            ticket.ipAddress = request.remoteIP;
            const totalInterval = ticket.ipAddressSwitchTimeIntervals.reduce((total, interval) => total + interval, 0);
            if(ticket.ipAddressSwitchTimeIntervals.length >= 10) {
                const averageInterval = totalInterval / ticket.ipAddressSwitchTimeIntervals.length;
                if(averageInterval < 1800) {
                    [...ticket.oldIPAddresses, ticket.ipAddress].forEach(ip => blockedIPAddresses.push(ip));
                    logger.warn('阻止IP地址名单：', blockedIPAddresses);
                    throw new APIException(EX.API_REQUEST_HAS_BLOCKED);
                }
                ticket.ipAddressSwitchTimeIntervals.shift();
            }
            ticket.ipAddressSwitchTimeIntervals.push(util.unixTimestamp() - (ticket.createTime + totalInterval));
        }
        await redis.hmset(`ticket:${ticket.id}`, ticket.toRedisData());
        return ticket;
    }

}