import { Scene } from '@/api/models/scene.ts';

class AIVtuberScam extends Scene {

    constructor() {
        super({
            id: 'ai-vtuber-scam',
            name: '亦真亦假',
            description: '老爸的好友发来一条链接：“XX邀请您视频通话，请尽快点击接听”，点击后屏幕却映入了自己弟弟的脸，虽然感觉很奇怪，但是这脸确实一模一样，甚至声音也一样，很快就打消了困惑，“弟弟”说：“大哥，我微信被封号了，用我朋友的微信跟你聊。我准备买车，现在在银行办贷款，银行说要验证我的资金再确定给我放贷，先转10万块到我发给你的银行卡账号，验完后我再转回给你！要在10分钟内转完，不然就要等一周后了！”',
            coverResId: 'images.scene_ai_vtuber_scam' 
        });
    }

}

export default new AIVtuberScam();