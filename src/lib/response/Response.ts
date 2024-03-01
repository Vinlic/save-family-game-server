import mime from 'mime';
import _ from 'lodash';

import Body from './Body.ts';
import util from '../util.ts';

export default class Response {

    /** @type {number} 响应HTTP状态码 */
    statusCode;
    /** @type {string} 响应内容类型 */
    type;
    /** @type {Object} 响应headers */
    headers;
    /** @type {string} 重定向目标 */
    redirect;
    /** @type {any} 响应载荷 */
    body;
    /** @type {number} 响应载荷大小 */
    size;
    /** @type {number} 响应时间戳 */
    time = 0;

    constructor(body, options = {}) {
        const { statusCode, type, headers, redirect, size, time } = options as any;
        this.statusCode = Number(_.defaultTo(statusCode, Body.isInstance(body) ? body.statusCode : undefined))
        this.type = type;
        this.headers = headers;
        this.redirect = redirect;
        this.size = size;
        this.time = Number(_.defaultTo(time, util.timestamp()));
        this.body = body;
    }

    injectTo(ctx) {
        this.redirect && ctx.redirect(this.redirect);
        this.statusCode && (ctx.status = this.statusCode);
        this.type && (ctx.type = mime.getType(this.type) || this.type);
        const headers = this.headers || {};
        if(this.size && !headers["Content-Length"] && !headers["content-length"])
            headers["Content-Length"] = this.size;
        ctx.set(headers);
        if(Body.isInstance(this.body))
            ctx.body = this.body.toObject();
        else
            ctx.body = this.body;
    }

    static isInstance(value) {
        return value instanceof Response;
    }

}