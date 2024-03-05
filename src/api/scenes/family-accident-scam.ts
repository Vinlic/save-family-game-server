import { Scene } from '@/api/models/Scene.ts';

class FamilyAccidentScam extends Scene {

    constructor() {
        super({
            id: 'family-accident-scam',
            name: '妈！我出车祸了',
            description: '常年在外工作的表妹突然给舅妈打来电话：“妈！我出车祸了！要紧急手术，医院收款账号已经发给你了，要先打2万块钱！”，听筒中确实是女儿的声音，也许是受了重伤声音听上去有些嘶哑。',
            coverResId: 'images.scene_family_accident_scam' 
        });
    }

}

export default new FamilyAccidentScam();