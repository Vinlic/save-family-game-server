import { Scene } from '@/api/models/Scene.ts';

class OnlineShoppingScam extends Scene {

    constructor() {
        super({
            id: 'brushing-orders-scam',
            name: '贪小失大',
            description: '姐姐收到一个陌生的快递，里面有一支笔和一张“回馈客户”的二维码卡片，扫描后进入一个刷单群，发现群里有人发链接，可以领任务刷单赚钱，于是下载了做任务的APP，做一些淘宝刷单任务，赚到了四五百元钱，并成功提现。闲下来时看到群里又发刷单任务，抢到了一个1023元任务单，得知刷完连本带利可以拿到1330元，心里非常喜悦。',
            coverResId: 'images.scene_brushing_orders_scam',
            initialMessages: [
                { role: 'other', roleName: '姐姐', content: '你猜怎么着？我刚收到了一个奇怪的快递。' },
                { role: 'other', roleName: '姐姐', content: '里面有一支笔和一张二维码卡片，上面写着“回馈客户”的。' },
                { role: 'self', roleName: '我', content: '听起来像是广告或者诈骗啊，你扫嘛了吗？' },
                { role: 'other', roleName: '姐姐', content: '我好奇嘛，就扫了一下，结果加入了一个刷单群，群里有人发链接说可以领任务赚钱，我就试了试我做了一些淘宝刷单任务，赚了四五百块钱，还成功提现了！我现在好兴奋！' },
                { role: 'self', roleName: '姐姐', content: '我刚抢到一个1023元的大任务单！不说了，我要赚钱去啦~' }
            ]
        });
    }

}

export default new OnlineShoppingScam();