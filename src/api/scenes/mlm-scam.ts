import { Scene } from '@/api/models/scene.ts';

class MLMScam extends Scene {

    constructor() {
        super({
            id: 'mlm-scam',
            name: '谁是接盘侠？',
            description: '表弟收到朋友发来的消息：“我在XX商城抢购进口红酒然后转手赚差价，闲着没事操作操作一个月已经赚了两万多了，快去下载APP上车啊！”，接着发来下载APP的二维码。',
            coverResId: 'images.scene_mlm_scam' 
        });
    }

}

export default new MLMScam();