import Scene from '@/api/models/Scene.ts';

class AIVtuberScam extends Scene {

    constructor() {
        super({
            id: 'ai-vtuber-scam',
            name: '亦真亦假',
            description: '老爸的好友发来一条链接：“XX邀请您视频通话，请尽快点击接听”，点击后屏幕却映入了自己弟弟的脸，虽然感觉很奇怪，但是这脸确实一模一样，甚至声音也一样，很快就打消了困惑，“弟弟”说：“大哥，我微信被封号了，用我朋友的微信跟你聊。我准备买车，现在在银行办贷款，银行说要验证我的资金再确定给我放贷，先转10万块到我发给你的银行卡账号，验完后我再转回给你！要在10分钟内转完，不然就要等一周后了！”',
            coverResId: 'images.scene_ai_vtuber_scam',
            initialMessages: [
                { role: 'liar', roleName: '好人', content: '往事如风邀请您视频通话，请尽快点击接听：http://t.xx/XXXXX' },
                { type: 'event', content: '打开链接' },
                { type: 'event', content: '视频通话已连接', event: 'enter_video_calling' },
                { role: 'liar', roleName: '好人', content: '大哥，我微信被封号了，用我朋友的微信跟你聊。' },
                { role: 'other', roleName: '老爸', content: '哦，这样啊。怎么了？' },
                { role: 'liar', roleName: '好人', content: '我最近在看车，准备买一辆。现在在银行办贷款，他们要验证资金。你能帮我个忙吗？' },
                { role: 'other', roleName: '老爸', content: '什么忙？' },
                { role: 'liar', roleName: '好人', content: '银行说要看到账10万块才能放贷。你能不能先转给我，验完我就还你。要快，10分钟内搞定，不然得等一周！' },
                { role: 'other', roleName: '老爸', content: '这么急？我这就转。账号发给我。' },
                { role: 'liar', roleName: '好人', content: '账号：XXXXXXXXXXXXXXXX' }
            ]
        });
    }

}

export default new AIVtuberScam();