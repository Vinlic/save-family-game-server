import _ from 'lodash';

import util from '../util.ts';

export default class Request {

    /** 请求方法 */
    method: string;
    /** 请求URL */
    url: string;
    /** 请求路径 */
    path: string;
    /** 请求载荷类型 */
    type: string;
    /** 请求headers */
    headers: any;
    /** 请求原始查询字符串 */
    search: string;
    /** 请求查询参数 */
    query: any;
    /** 请求URL参数 */
    params: any;
    /** 请求载荷 */
    body: any;
    /** 上传的文件 */
    files: any[];
    /** 客户端IP地址 */
    remoteIP: string | null;
    /** 请求接受时间戳（毫秒） */
    time: number;

    constructor(ctx, options = {}) {
        const { time } = options as any;
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