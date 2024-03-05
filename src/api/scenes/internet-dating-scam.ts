import { Scene } from '@/api/models/Scene.ts';

class InternetDatingScam extends Scene {

    constructor() {
        super({
            id: 'internet-dating-scam',
            name: '交友需谨慎',
            description: '堂妹在游戏中结识了一个经常语音陪玩的朋友，对方富有磁性的声音和幽默感成功俘获了的心，很快两人成为男女朋友，男友也经常给她送游戏皮肤和装备，然而，一天，男友突然提出要她帮忙投资一个虚拟货币项目，声称有内幕消息，可以获得高额回报。同时还展示了一些看似专业的图表和数据分析，以及一些成功的交易记录。',
            coverResId: 'images.scene_internet_dating_scam'
        });
    }

}

export default new InternetDatingScam();