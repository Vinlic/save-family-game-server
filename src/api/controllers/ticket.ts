import _ from 'lodash';

import Ticket from '@/api/models/Ticket.ts';
import EX from '@/api/consts/exceptions.ts';
import APIException from '@/lib/exceptions/APIException.ts';
import redis from '@/lib/redis.ts';
import logger from '@/lib/logger.ts';
import util from '@/lib/util.ts';

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
        const { username, ipAddress } = options as any;
        const ticket = new Ticket({
            username,
            ipAddress
        });
        await ticket.save();
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
        const ticket = await Ticket.load(ticketId);
        if(ticket == null)
            throw new APIException(EX.API_TICKET_EXPIRED);
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
        await ticket.save();
        return ticket;
    }

}