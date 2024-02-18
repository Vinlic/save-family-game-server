"use strict";

import environment from './lib/environment.js';
// import config from './lib/config.js';
// import './lib/initialize.js';
// import Server from './core/server/Server.js';
// import BrowserPool from './core/browser/BrowserPool.js';
// import TaskPool from './core/task/TaskPool.js';
// import Caller from './core/caller/Caller.js';
// import SystemManager from './core/system/SystemManager.js';
// import APIManager from './core/system/APIManager.js';
// import serviceManage from './lib/service-manage.js';
// import routes from './routes/index.js';
// import context from './lib/context.js';
// import logger from './lib/logger.js';
// import fonts from './lib/fonts.js';
// import util from './lib/util.js';

// const startupTime = util.timestamp();

// (async () => {    

//     logger.header();

//     util.printLogo();  //输出Logo

//     logger.info("<<<< aggregation service >>>>");
//     logger.info("version:", environment.package.version);
//     logger.info("process id:", process.pid);
//     logger.info("environment:", environment.env);
//     logger.info("service name:", config.service.name);
//     logger.info("video template:", videoTemplateVersion);
//     logger.info("ssml document:", ssmlDocumentVersion);
//     logger.info(`loaded fonts: ${Object.keys(fonts).join(" / ")}`);

//     await serviceManage.init();  //初始化服务管理
//     if(config.system.enableNaming) {
//         logger.info("service registering...");
//         await serviceManage.register();  //注册服务
//         logger.success("service registered");
//     }
//     context.attach("serviceManage", serviceManage);  //挂载服务管理

//     const caller = new Caller({ config: config.system.caller });
//     caller.init();  //初始化回调器
//     context.attach("caller", caller);  //挂载回调器

//     const browserPool = new BrowserPool({ config: config.browserPool });
//     await browserPool.init();
//     context.attach("browserPool", browserPool);  //挂载无头浏览器池

//     const taskPool = new TaskPool({ config: config.system.taskPool });
//     await taskPool.init();  //初始化任务池
//     context.attach("taskPool", taskPool);  //挂载任务池

//     const systemManager = new SystemManager();
//     await systemManager.init();  //初始化系统管理器
//     systemManager.cleanExpiredFiles();  //清理过期文件
//     systemManager.registerMonitorRoutes(routes);  //注册监控的路由
//     context.attach("systemManager", systemManager);

//     const apiManager = new APIManager();
//     context.attach("apiManager", apiManager);

//     const server = new Server({ config: config.service, requestBodyConfig: config.system.requestBody });
//     server.init();  //初始化服务器
//     server.attachRoutes(routes);  //挂载路由
//     await server.listen();

//     config.service.bindAddress && logger.success("service bind address:", config.service.bindAddress);

//     process.on("uncaughtException", (err, origin) => {
//         logger.error(`An unhandled error occurred: ${origin}`, err);
//         logger.alert(`聚合服务发生未处理的异常，请及时处理，否则可能导致异常行为`, err);
//     });  //输出未捕获异常
//     process.on("unhandledRejection", (_, promise) => {
//         promise.catch(err => logger.error("An unhandled rejection occurred:", err));
//         logger.alert(`聚合服务发生未处理的Reject，此由某个Promise所抛出但未进行任何捕获处理，请及时处理`);
//     });  //输出未处理的Promise.reject
//     process.on("warning", warning => logger.warn("System warning: ", warning));
//     process.on("exit", () => {
//         logger.info("service exit");
//         logger.footer();
//     });  //进程退出事件
//     process.on("SIGTERM", () => {
//         logger.warn("received kill signal");
//         process.exit(2);
//     });  //kill退出进程
//     process.on("SIGINT", () => {
//         process.exit(0);
//     });  //主动退出进程

// })()
// .then(() => logger.success(`service startup completed (${util.millisecondsToTimeString(util.timestamp() - startupTime)})`))
// .catch(err => {
//     logger.fatal("system error:", err);
//     process.exit(1);  //发生严重错误时退出进程
// });