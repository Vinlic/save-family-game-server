import Scene from '@/api/models/Scene.ts';

class FamilyAccidentScam extends Scene {

    constructor() {
        super({
            id: 'family-accident-scam',
            name: '妈！我出车祸了',
            description: '常年在外工作的表妹突然给舅妈打来电话：“妈！我出车祸了！要紧急手术，医院收款账号已经发给你了，要先打2万块钱！”，听筒中确实是女儿的声音，也许是受了重伤声音听上去有些嘶哑。',
            coverResId: 'images.scene_family_accident_scam',
            initialMessages: [
                { type: 'event', content: '接听电话', event: 'answer_calling' },
                { role: 'liar', roleName: '表妹', content: '喂！妈！我出事了！呜呜呜...' },
                { role: 'other', roleName: '舅妈', content: '宝贝？你怎么了？？' },
                { role: 'liar', roleName: '表妹', content: '我刚刚出了车祸，现在在医院，我的腿扭断了！呜呜呜...医生说需要马上手术，不然我的腿就保不住了，要先交2万块，我把银行账号报给你...' },
                { role: 'other', roleName: '舅妈', content: '我这就给你转过去，你坚持住！' }
            ]
        });
    }

}

export default new FamilyAccidentScam();