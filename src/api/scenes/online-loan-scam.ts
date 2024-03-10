import Scene from '@/api/models/Scene.ts';

class OnlineLoanScam extends Scene {

    constructor() {
        super({
            id: 'online-loan-scam',
            name: '被套路贷包围了',
            description: '小姑是月光族，前段时间信用卡也刷爆了，刚刚收到短信：“尊敬的客户，由于政策放宽，您在我行可办理498000元借款，可用于日常消费、生意周转、房屋装修，申请请回复1。”',
            coverResId: 'images.scene_online_loan_scam' 
        });
    }

}

export default new OnlineLoanScam();