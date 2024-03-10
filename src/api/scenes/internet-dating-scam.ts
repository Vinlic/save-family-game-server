import Scene from '@/api/models/Scene.ts';

class InternetDatingScam extends Scene {

    constructor() {
        super({
            id: 'internet-dating-scam',
            name: '交友需谨慎',
            description: '堂妹在游戏中结识了一个经常语音陪玩的朋友，对方富有磁性的声音和幽默感成功俘获了的心，很快两人成为男女朋友，男友也经常给她送游戏皮肤和装备，然而，一天，男友突然提出要她帮忙投资一个虚拟货币项目，声称有内幕消息，可以获得高额回报。同时还展示了一些看似专业的图表和数据分析，以及一些成功的交易记录。',
            coverResId: 'images.scene_internet_dating_scam',
            initialMessages: [
                { role: 'other', roleName: '堂妹', content: '哥，你看我的最近钓到的男朋友怎么样？' },
                { type: 'image', role: 'other', roleName: '堂妹', content: '' },
                { role: 'self', roleName: '我', content: '可以啊！挺帅的，咋认识的说说？' },
                { role: 'other', roleName: '堂妹', content: '就游戏里偶然匹配到的，他的声音贼有磁性，而且超级幽默，我们每天连麦上号' },
            ]
        });
    }

}

export default new InternetDatingScam();