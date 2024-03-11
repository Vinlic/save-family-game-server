import Scene from '@/api/models/Scene.ts';

class MLMScam extends Scene {

    constructor() {
        super({
            id: 'mlm-scam',
            name: '谁是接盘侠？',
            description: '表弟收到朋友发来的消息：“我在聚宝盆商城抢购进口红酒然后转手赚差价，闲着没事操作操作一个月已经赚了两万多了，快去下载APP上车啊！”，接着发来下载APP的二维码。',
            coverResId: 'images.scene_mlm_scam',
            initialMessages: [
                { role: 'liar', roleName: '朋友', content: '最近我在聚宝盆商城抢购进口红酒，这个月已经赚了两万多了，快快上车啊' },
                { role: 'other', roleName: '表弟', content: '这么离谱？？抢购红酒还能赚钱？' },
                { role: 'liar', roleName: '朋友', content: '就是每天按当前价格抢购，第二天这批红酒就会涨，只要出手就能赚差价，贼赚！' },
                { role: 'liar', roleName: '朋友', content: '聚宝盆商城下载链接：https://xxxxxxx' },
                { role: 'other', roleName: '表弟', content: '谢谢，我去试试哈' }
            ]
        });
    }

}

export default new MLMScam();