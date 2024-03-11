import Scene from '@/api/models/Scene.ts';

class NudeChatScam extends Scene {

    constructor() {
        super({
            id: 'nude-chat-scam',
            name: '色迷心窍',
            description: '深夜，堂弟在游戏中收到一条私信：“弟弟，姐姐好无聊好寂寞，扫二维码下载这个APP跟我视频聊天，有惊喜哟！”，“视频聊天”后对方却发过来堂弟手机的通讯录列表和大尺度的照片威胁索要“封口费”5000元。',
            coverResId: 'images.scene_nude_chat_scam',
            initialMessages: [
                { role: 'liar', roleName: '小姐姐', content: '弟弟，姐姐好无聊好寂寞，陪我聊聊天呗~' },
                { role: 'other', roleName: '堂弟', content: '啊哈？姐咋还没睡？' },
                { role: 'liar', roleName: '小姐姐', content: '就是不想睡嘛，我们来视频吧！刺激的那种~' },
                { role: 'liar', roleName: '小姐姐', content: '下载这个app，我开了个视频房间(房间号:114514)，咱们私聊嘿嘿~，🔗下载链接' },
                { type: 'event', content: '下载app', event: 'download_app' },
                { role: 'other', roleName: '堂弟', content: '好~我下载好啦，视频里见！' },
                { type: 'event', content: '打开app', event: 'enter_app' },
                { type: 'event', content: '视频通话已连接', event: 'enter_video_calling', timeout: 1500 },
                { type: 'event', content: '视频通话已中断', event: 'abort_video_calling' },
                { role: 'other', roleName: '堂弟', content: '咦，姐姐怎么中断了，我才刚进入状态咧~😍' },
                { type: 'image', role: 'liar', roleName: '小姐姐', content: '' },
                { type: 'image', role: 'liar', roleName: '小姐姐', content: '' },
                { role: 'other', roleName: '堂弟', content: '等等，这是什么？！你怎么会有这样的照片和我的通讯录列表？！' },
                { role: 'liar', roleName: '小姐姐', content: '哦，弟弟，这些照片和通讯录是我不小心发现的。现在你有两个选择，一是给我5000元封口费，我保证这些都不会再出现；二是我把这些照片发给你通讯录的家人朋友们，你自己看着办吧。' },
                { role: 'other', roleName: '堂弟', content: '别。别发！我得凑钱再给你，求你给我点时间。' }
            ]
        });
    }

}

export default new NudeChatScam();