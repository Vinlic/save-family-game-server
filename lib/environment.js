import path from 'path';

import fs from 'fs-extra';
import minimist from 'minimist';
import _ from 'lodash';

const cmdArgs = minimist(process.argv.slice(2));  //获取命令行参数
const envVars = process.env;  //获取环境变量

class Environment {

    /** @property {Object} 命令行参数 */
    cmdArgs;
    /** @property {Object} 环境变量 */
    envVars;
    /** @property {string} 运行环境 */
    env = '';
    /** @property {string} 服务名称 */
    name;
    /** @property {string} 服务地址 */
    host;
    /** @property {number} 服务端口 */
    port;
    /** @property {Object} 包参数 */
    package;

    constructor(options = {}) {
        const { cmdArgs, envVars, package: _package } = options;
        this.cmdArgs = cmdArgs;
        this.envVars = envVars;
        this.env = _.defaultTo(cmdArgs.env || envVars.GAME_SERVER_ENV, 'dev');
        this.name = _.defaultTo(cmdArgs.name || envVars.GAME_SERVER_NAME, 'game-server');
        this.host = _.defaultTo(cmdArgs.host || envVars.GAME_SERVER_HOST, '0.0.0.0');
        this.port = Number(_.defaultTo(cmdArgs.port || envVars.GAME_SERVER_PORT, 5566));
        this.package = _package;
    }

}

export default new Environment({
    cmdArgs,
    envVars,
    package: JSON.parse(fs.readFileSync(path.join(path.resolve(), "package.json")).toString())
});