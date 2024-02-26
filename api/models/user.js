import _ from 'lodash';
import util from '../../lib/util.js';

export class Ticket {

    /** @type {string} 凭据ID */
    id;
    /** @type {string} 用户名 */
    username;
    /** @type {string} IP地址 */
    ipAddress;

    constructor(options = {}) {
        this.id = _.defaultTo(options.id, util.uuid());
        this.username = options.username;
        this.ipAddress = options.ipAddress;
    }

}