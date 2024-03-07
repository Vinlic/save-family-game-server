export default interface ITicket {
    /** 凭据ID */
    id?: string;
    /** 用户名 */
    username: string;
    /** IP地址 */
    ipAddress: string;
    /** 旧的IP地址列表 */
    oldIPAddresses?: string[];
    /** IP地址切换时间间隔列表 */
    ipAddressSwitchTimeIntervals?: number[];
    /** 创建时间 */
    createTime?: number;
}