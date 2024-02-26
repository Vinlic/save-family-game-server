import assert from 'assert';

import _ from 'lodash';

export default class Exception extends Error {

    /** @type {number} 错误码 */
    errcode;
    /** @type {string} 错误消息 */
    errmsg;

    /**
     * 构造异常
     * 
     * @param {[number, string]} exception 异常
     * @param {string} _errmsg 异常消息
     */
    constructor(exception, _errmsg, stack) {
        assert(_.isArray(exception), 'Exception must be Array');
        const [errcode, errmsg] = exception;
        assert(_.isFinite(errcode), 'Exception errcode invalid');
        assert(_.isString(errmsg, 'Exception errmsg invalid'));
        super(_errmsg || errmsg);
        this.errcode = errcode;
        this.errmsg = errmsg;
        this.stack = stack;
    }

}