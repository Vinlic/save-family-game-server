import _ from 'lodash';

import util from '../util.js';

export default class Request {

    /** @type {string} 请求方法 */
    method;
    /** @type {string} 请求URL */
    url;
    /** @type {string} 请求路径 */
    path;
    /** @type {string} 请求载荷类型 */
    type;
    /** @type {Object} 请求headers */
    headers;
    /** @type {string} 请求原始查询字符串 */
    search;
    /** @type {Object} 请求查询参数 */
    query;
    /** @type {Object} 请求URL参数 */
    params;
    /** @type {Object} 请求载荷 */
    body;
    /** @type {Array} 上传的文件 */
    files;
    /** @type {string} 客户端IP地址 */
    remoteIP;
    /** @type {number} 请求接受时间戳（毫秒） */
    time = 0;

    constructor(ctx, options = {}) {
        const { time } = options;
        this.time = Number(_.defaultTo(time, util.timestamp()));
        this.init(ctx);
    }

    init(ctx) {
        this.method = ctx.request.method;
        this.url = ctx.request.url;
        this.path = ctx.request.path;
        this.type = ctx.request.type;
        this.headers = ctx.request.headers || {};
        this.search = ctx.request.search;
        this.query = ctx.query || {};
        this.params = ctx.params || {};
        this.body = ctx.request.body || {};
        this.files = ctx.request.files || {};
        this.remoteIP = this.headers["X-Real-IP"] || this.headers["x-real-ip"] || this.headers["X-Forwarded-For"] || this.headers["x-forwarded-for"] || ctx.ip || null;
    }


}