import Scene from '@/api/models/Scene.ts';

class TeaPickingGirlScam extends Scene {

    constructor() {
        super({
            id: 'tea-picking-girl-scam',
            name: '替爷卖茶',
            description: '表哥的微信收到一条好友验证消息，验证后对方发来消息：“小哥哥，不好意思好像加错人了，不过能成为好友就是缘分，就不删了哈！”，表哥通过朋友圈看到她正在帮生病的爷爷打理茶场，照片中的她长相十分俊俏，很快二人开始了聊天。一个星期后，突然收到一条消息：“爷爷的病昨晚突然恶化，但是手术还差一些钱，求哥哥帮帮忙救命，买十箱茶叶，这些都是特级茶叶！”',
            coverResId: 'images.scene_tea_picking_girl_scam' 
        });
    }

}

export default new TeaPickingGirlScam();