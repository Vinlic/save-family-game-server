import  _ from 'lodash';

export default class Body {

    /** @type {number} 状态码 */
    code = 0;
    /** @type {string} 状态消息 */
    message = '';
    /** @type {any} 载荷 */
    data = {};
    /** @type {number} HTTP状态码 */
    statusCode = 0;

    constructor(options = {}) {
        const { code, message, data, statusCode } = options;
        this.code = Number(code);
        this.message = message;
        this.data = _.defaultTo(data, null);
        this.statusCode = Number(_.defaultTo(statusCode, 200));
    }

    toObject() {
        return {
            code: this.code,
            message: this.message,
            data: this.data
        };
    }

    static isInstance(value) {
        return value instanceof Body;
    }

}