import { Scene } from '@/api/models/scene.ts';

class NudeChatScam extends Scene {

    constructor() {
        super({
            id: 'nude-chat-scam',
            name: '色迷心窍',
            description: '深夜，堂弟在游戏中收到一条私信：“弟弟，姐姐好无聊好寂寞，扫二维码下载这个APP跟我视频聊天，有惊喜哟！”，“视频聊天”后对方却发过来堂弟手机的通讯录列表和大尺度的照片威胁索要“封口费”5000元。',
            coverResId: 'images.scene_nude_chat_scam' 
        });
    }

}

export default new NudeChatScam();