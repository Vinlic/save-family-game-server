import _ from 'lodash';

import redis from '@/lib/redis.ts';
import util from '@/lib/util.ts';

export default class Ticket {

    /** 凭据ID */
    ticketId: string;
    /** 用户名 */
    username: string;
    /** IP地址 */
    ipAddress: string;
    /** 旧的IP地址列表 */
    oldIPAddresses: string[];
    /** IP地址切换时间间隔列表 */
    ipAddressSwitchTimeIntervals: number[];
    /** 创建时间 */
    createTime: number;

    constructor(options = {}) {
        const { id, username, ipAddress, oldIPAddresses, ipAddressSwitchTimeIntervals, createTime } = options as any;
        this.ticketId = _.defaultTo(id, util.uuid());
        this.username = username;
        this.ipAddress = ipAddress;
        this.oldIPAddresses = _.defaultTo(oldIPAddresses, []);
        this.ipAddressSwitchTimeIntervals = _.defaultTo(ipAddressSwitchTimeIntervals, []);
        this.createTime = _.defaultTo(createTime, util.unixTimestamp());
    }

    async save() {
        await redis.hmset(`tk:${this.ticketId}`, {
            ...this,
            oldIPAddresses: JSON.stringify(this.oldIPAddresses),
            ipAddressSwitchTimeIntervals: JSON.stringify(this.ipAddressSwitchTimeIntervals),
            createTime: `${this.createTime}`
        });
    }

    static async load(ticketId: string) {
        const data = await redis.hmget(`tk:${ticketId}`, 'id', 'username', 'ipAddress', 'oldIPAddresses', 'ipAddressSwitchTimeIntervals', 'createTime');
        if(data == null)
            return null;
        const { oldIPAddresses, ipAddressSwitchTimeIntervals, createTime } = data;
        return new Ticket({
            ...data,
            oldIPAddresses: JSON.parse(oldIPAddresses),
            ipAddressSwitchTimeIntervals: JSON.parse(ipAddressSwitchTimeIntervals),
            createTime: Number(createTime)
        });
    }

    toMaskedData() {
        return _.omit(this, 'ipAddress', 'oldIPAddresses', 'ipAddressSwitchTimeIntervals');
    }

}