import { Scene } from '@/api/models/scene.ts';

class HealthProductScam extends Scene {

    constructor() {
        super({
            id: 'health-product-scam',
            name: '包治百病',
            description: '附近的闲置厂房突然热闹起来，奶奶拿着一张保健品宣传海报回到家：“对面那来了个中科院院士！讲得好专业！还有款限量十瓶的防癌药，不跟你说了我要去拿点现金！”',
            coverResId: 'images.scene_health_product_scam' 
        });
    }

}

export default new HealthProductScam();