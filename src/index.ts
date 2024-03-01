"use strict";

import environment from "@/lib/environment.ts";
import config from "@/lib/config.ts";
import "@/lib/initialize.ts";
import server from "@/lib/server.ts";
import routes from "@/api/routes/index.ts";
import logger from "@/lib/logger.ts";
import util from "@/lib/util.ts";

const startupTime = performance.now();

(async () => {
  logger.header();

  util.printLogo();

  logger.info("<<<< save family server >>>>");
  logger.info("Version:", environment.package.version);
  logger.info("Process id:", process.pid);
  logger.info("Environment:", environment.env);
  logger.info("Service name:", config.service.name);

  server.attachRoutes(routes);
  await server.listen();

  config.service.bindAddress &&
    logger.success("service bind address:", config.service.bindAddress);
})()
  .then(() =>
    logger.success(
      `Service startup completed (${parseFloat((performance.now() - startupTime).toFixed(2))}ms)`
    )
  )
  .catch((err) => console.error(err));
