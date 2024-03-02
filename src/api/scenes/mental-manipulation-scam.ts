import { Scene } from '@/api/models/scene.ts';

class MentalManipulationScam extends Scene {

    constructor() {
        super({
            id: 'mental-manipulation-scam',
            name: '提线木偶',
            description: '大哥每天抱着手机聊天，据说在和网上刚处的女友聊天，就是情绪不太稳定，时而悲伤沮丧、时而快乐兴奋，近来还找了许多人借钱，刚刚过来找你：“老三，有闲钱不，女朋友说再转5000给他买个包，我还差1300，她过两个月就来见我了！”',
            coverResId: 'images.scene_mental_manipulation_scam' 
        });
    }

}

export default new MentalManipulationScam();