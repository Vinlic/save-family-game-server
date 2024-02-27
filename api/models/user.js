import _ from 'lodash';
import util from '../../lib/util.js';

export class Ticket {

    /** @type {string} 凭据ID */
    id;
    /** @type {string} 用户名 */
    username;
    /** @type {string} IP地址 */
    ipAddress;
    /** @type {string[]} 旧的IP地址列表 */
    oldIPAddresses;
    /** @type {number[]} IP地址切换时间间隔列表 */
    ipAddressSwitchTimeIntervals;
    /** @type {number} 创建时间 */
    createTime;

    constructor(options = {}) {
        const { id, username, ipAddress, oldIPAddresses, ipAddressSwitchTimeIntervals, createTime } = options;
        this.id = _.defaultTo(id, util.uuid());
        this.username = username;
        this.ipAddress = ipAddress;
        this.oldIPAddresses = _.defaultTo(oldIPAddresses, []);
        this.ipAddressSwitchTimeIntervals = _.defaultTo(ipAddressSwitchTimeIntervals, []);
        this.createTime = _.defaultTo(createTime, util.unixTimestamp());
    }

    toRedisData() {
        return {
            ...this,
            oldIPAddresses: JSON.stringify(this.oldIPAddresses),
            ipAddressSwitchTimeIntervals: JSON.stringify(this.ipAddressSwitchTimeIntervals),
            createTime: `${this.createTime}`
        }
    }

    static parseRedisData(value = {}) {
        const { oldIPAddresses, ipAddressSwitchTimeIntervals, createTime } = value || {};
        return new Ticket({
            ...value,
            oldIPAddresses: JSON.parse(oldIPAddresses),
            ipAddressSwitchTimeIntervals: JSON.parse(ipAddressSwitchTimeIntervals),
            createTime: Number(createTime)
        });
    }

}