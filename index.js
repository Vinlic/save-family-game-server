"use strict";

import environment from './lib/environment.js';
import config from './lib/config.js';
import './lib/initialize.js';
import Server from './lib/Server.js';
import routes from './routes/index.js';
import logger from './lib/logger.js';
import util from './lib/util.js';

const startupTime = util.timestamp();

(async () => {    

    logger.header();

    util.printLogo();  //输出Logo

    logger.info("<<<< save family server >>>>");
    logger.info("Version:", environment.package.version);
    logger.info("Process id:", process.pid);
    logger.info("Environment:", environment.env);
    logger.info("Service name:", config.service.name);

    const server = new Server();
    server.init();  //初始化服务器
    server.attachRoutes(routes);  //挂载路由
    await server.listen();

    config.service.bindAddress && logger.success("service bind address:", config.service.bindAddress);

})()
.then(() => logger.success(`Service startup completed (${util.millisecondsToTimeString(util.timestamp() - startupTime)})`))
.catch(err => {
    logger.fatal("System error:", err);
    process.exit(1);  //发生严重错误时退出进程
});