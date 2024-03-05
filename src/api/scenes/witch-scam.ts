import { Scene } from '@/api/models/Scene.ts';

class WitchScam extends Scene {

    constructor() {
        super({
            id: 'witch-scam',
            name: '心中有鬼',
            description: '大姨一家人出国旅游归来不到两周，表侄女突然发烧，拒绝去医院，性格变得十分执拗，眼神空洞，前言不搭后语经常说胡话，家里人都说“中邪”，是在国外碰上“脏东西”了，准备请一位神婆过来看看，但你从网上查询资料怀疑表侄女可能是患上脑炎。',
            coverResId: 'images.scene_witch_scam'
        });
    }

}

export default new WitchScam();