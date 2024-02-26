import util from '../lib/util.js';

export class Ticket {

    /** @type {string} 凭据ID */
    id;
    /** @type {string} 用户名 */
    username;

    constructor() {
        this.id = util.uuid();
        
    }

}