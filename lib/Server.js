import Koa from 'koa';
import KoaRouter from 'koa-router';
import koaRange from 'koa-range';
import koaCors from "koa2-cors";
import koaBody from 'koa-body';
import _ from 'lodash';

import Request from './request/Request.js';
import Response from './response/Response.js';
import FailureBody from './response/FailureBody.js';
import logger from './logger.js';
import config from './config.js';

export default class Server {

    #koa;  //Koa实例
    #router;  //Koa路由
    
    init() {
        this.#koa = new Koa();
        this.#koa.use(koaCors());
        this.#koa.use(koaRange);  //范围请求支持
        this.#router = new KoaRouter({ prefix: config.service.urlPrefix });
        this.#koa.use(async (ctx, next) => {
            if(ctx.request.type === "application/xml" || ctx.request.type === "application/ssml+xml")
                ctx.req.headers["content-type"] = "text/xml";
            try { await next() }
            catch (err) {
                logger.error(err);
                const failureBody = new FailureBody(err);
                new Response(failureBody).injectTo(ctx);
            }
        });  //前置处理异常拦截
        this.#koa.use(koaBody(_.clone(config.system.requestBody)));  //载荷解析器支持
        this.#koa.on("error", err => {
            if (["ECONNRESET", "ECONNABORTED", "EPIPE", "ECANCELED"].includes(err.code)) return;  //忽略连接重试、中断、管道、取消错误
            logger.error(err);
        });
        logger.success("Server initialized");
    }

    attachRoutes(routes) {
        routes.forEach(route => {
            const prefix = route.prefix || "";
            for (let method in route) {
                if(method === "prefix") continue;
                if (!_.isObject(route[method])) {
                    logger.warn(`Router ${prefix} ${method} invalid`);
                    continue;
                }
                for (let uri in route[method]) {
                    this.#router[method](`${prefix}${uri}`, async ctx => {
                        const { request, response } = await this.#requestProcessing(ctx, route[method][uri]);
                        if(response != null && config.system.requestLog)
                            logger.info(`<- ${request.method} ${request.url} ${response.time - request.time}ms`);
                    });
                }
            }
            logger.info(`Route ${config.service.urlPrefix || ""}${prefix} attached`);
        });
        this.#koa.use(this.#router.routes());
        this.#koa.use(ctx => {
            const request = new Request(ctx);
            logger.debug(`-> ${ctx.request.method} ${ctx.request.url} request is not supported - ${request.remoteAddress || "unknown"}`);
            const failureBody = new FailureBody(new Error("Request is not supported"));
            const response = new Response(failureBody);
            response.injectTo(ctx);
            if(config.system.requestLog)
                logger.info(`<- ${request.method} ${request.url} ${response.time - request.time}ms`);
        });
    }

    #requestProcessing(ctx, route) {
        return new Promise(resolve => {
            const request = new Request(ctx);
            try {
                if(config.system.requestLog)
                    logger.info(`-> ${request.method} ${request.url}`);
                route(request)
                .then(response => {
                    try {
                        if(!Response.isInstance(response)) {
                            const _response = new Response(response);
                            _response.injectTo(ctx);
                            return resolve({ request, response: _response });
                        }
                        response.injectTo(ctx);
                        resolve({ request, response });
                    }
                    catch(err) {
                        logger.error(err);
                        const failureBody = new FailureBody(err);
                        const response = new Response(failureBody);
                        response.injectTo(ctx);
                        resolve({ request, response });
                    }
                })
                .catch(err => {
                    try {
                        logger.error(err);
                        const failureBody = new FailureBody(err);
                        const response = new Response(failureBody);
                        response.injectTo(ctx);
                        resolve({ request, response });
                    }
                    catch(err) {
                        logger.error(err);
                        const failureBody = new FailureBody(err);
                        const response = new Response(failureBody);
                        response.injectTo(ctx);
                        resolve({ request, response });
                    }
                });
            }
            catch(err) {
                logger.error(err);
                const failureBody = new FailureBody(err);
                const response = new Response(failureBody);
                response.injectTo(ctx);
                resolve({ request, response });
            }
        });
    }

    async listen() {
        const host = config.service.host;
        const port = config.service.port;
        await Promise.all([
            new Promise((resolve, reject) => {
                if(host === "0.0.0.0" || host === "localhost" || host === "127.0.0.1")
                    return resolve();
                this.#koa.listen(port, "localhost", err => {
                    if(err) return reject(err);
                    resolve();
                });
            }),
            new Promise((resolve, reject) => {
                this.#koa.listen(port, host, err => {
                    if(err) return reject(err);
                    resolve();
                });
            })
        ]);
        logger.success(`Server listening on port ${port} (${host})`);
    }

}