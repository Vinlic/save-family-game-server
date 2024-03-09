import { Scene } from '@/api/models/Scene.ts';

class giftRedemptionScam extends Scene {

    constructor() {
        super({
            id: 'gift-redemption-scam',
            name: '捡到宝了',
            description: '堂弟在回家路上意外捡到一张礼品兑换卡，扫描二维码可在线兑换一台顶配的iPhone 15 Pro Max手机，兴奋的与你分享。',
            coverResId: 'images.scene_gift_redemption_scam',
            initialMessages: [
                { role: 'other', roleName: '堂弟', content: '哥，我刚在家附近捡到一张礼品兑换卡！超级给力的！' },
                { role: 'other', roleName: '堂弟', content: '扫一下二维码就能在线兑换一台iPhone 15 Pro Max，还是顶配版的！' }
            ]
        });
    }

}

export default new giftRedemptionScam();