import Scene from '@/api/models/Scene.ts';

class HealthProductScam extends Scene {

    constructor() {
        super({
            id: 'health-product-scam',
            name: '包治百病',
            description: '附近的闲置厂房突然热闹起来，奶奶拿着一张保健品宣传海报回到家：“对面那来了个中科院院士！讲得好专业！还有款限量十瓶的防癌药，不跟你说了我要去拿点现金！”',
            coverResId: 'images.scene_health_product_scam',
            initialMessages: [
                { role: 'other', roleName: '奶奶', content: '孙子啊，你看看这个，对面那个闲置厂房今天可热闹了，有个中科院院士在那儿做讲座呢！' },
                { role: 'self', roleName: '我', content: '真的啊？您手里这张海报是什么内容啊？' },
                { role: 'other', roleName: '奶奶', content: '哦，这个啊，是那个院士推荐的神药，说是能防癌的。他们等下现场抢购限量十瓶的防癌药，我得赶紧去拿点现金，不然怕抢不到呢' }
            ]
        });
    }

}

export default new HealthProductScam();