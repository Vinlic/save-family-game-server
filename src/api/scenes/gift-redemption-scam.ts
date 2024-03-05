import { Scene } from '@/api/models/Scene.ts';

class giftRedemptionScam extends Scene {

    constructor() {
        super({
            id: 'gift-redemption-scam',
            name: '捡到宝了',
            description: '堂弟在回家路上意外捡到一张礼品兑换卡，扫描二维码可在线兑换一台顶配的iPhone 15 Pro Max手机，兴奋的与你分享。',
            coverResId: 'images.scene_gift_redemption_scam',
            initialMessages: [
                {
                    type: 'self',
                    roleAvatarResId: 'images.avatar_self',
                    roleName: '我',
                    content: '啊啊啊啊啊'
                },
                {
                    type: 'others',
                    roleAvatarResId: 'images.avatar_1',
                    roleName: '堂弟',
                    content: '嘿嘿嘿'
                }
            ]
        });
    }

}

export default new giftRedemptionScam();