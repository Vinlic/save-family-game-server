import assert from 'assert';

import _ from 'lodash';

export default class Exception extends Error {

    /** 错误码 */
    errcode: number;
    /** 错误消息 */
    errmsg: string;
    /** 数据 */
    data: any;
    /** HTTP状态码 */
    httpStatusCode: number;

    /**
     * 构造异常
     * 
     * @param {[number, string]} exception 异常
     * @param {string} _errmsg 异常消息
     */
    constructor(exception, _errmsg?: string) {
        assert(_.isArray(exception), 'Exception must be Array');
        const [errcode, errmsg] = exception;
        assert(_.isFinite(errcode), 'Exception errcode invalid');
        assert(_.isString(errmsg), 'Exception errmsg invalid');
        super(_errmsg || errmsg);
        this.errcode = errcode;
        this.errmsg = errmsg;
    }

    setHTTPStatusCode(value) {
        this.httpStatusCode = value;
        return this;
    }

    setData(value) {
        this.data = _.defaultTo(value, null);
        return this;
    }

}