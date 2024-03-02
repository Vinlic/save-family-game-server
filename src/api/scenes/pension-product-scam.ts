import { Scene } from '@/api/models/scene.ts';

class PensionProductScam extends Scene {

    constructor() {
        super({
            id: 'pension-product-scam',
            name: '何以养老',
            description: '小区附近突然摆起了红布桌，一幅写着“养老院工程筹建”横幅竖立在中央，几个“工作人员”站在前面向过往的老年人发放传单，爷爷拿着传单回来：“你们看这个养老院项目，只要投资5万以上就可以入股，建成后可以免费入住，还可以获得分红和汽车奖励！”',
            coverResId: 'images.scene_pension_product_scam' 
        });
    }

}

export default new PensionProductScam();