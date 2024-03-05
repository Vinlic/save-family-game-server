import IMessage from '@/api/interfaces/IMessage.ts';
import util from '@/lib/util.ts';

export default class Message implements IMessage {

    type: string;
    id?: string;
    roleAvatarResId: string;
    roleName: string;
    content: string;

    constructor(options: IMessage) {
        this.type = options.type;
        this.id = options.id || util.uuid();
        this.roleAvatarResId = options.roleAvatarResId;
        this.roleName = options.roleName;
        this.content = options.content;
    }
}