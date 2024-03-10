import Scene from '@/api/models/Scene.ts';

class LostExpressScam extends Scene {

    constructor() {
        super({
            id: 'lost-express-scam',
            name: '我快递丢了？',
            description: '妹妹接到快递公司客服电话，称包裹在转运过程中丢失，根据公司规定需要进行双倍理赔，对方准确的说出了快递单号和收件人信息，需要下载指定的理赔APP并进行屏幕共享指导操作。',
            coverResId: 'images.scene_lost_express_scam' 
        });
    }

}

export default new LostExpressScam();