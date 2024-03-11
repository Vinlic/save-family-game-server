import Scene from '@/api/models/Scene.ts';

class OnlineLoanScam extends Scene {

    constructor() {
        super({
            id: 'online-loan-scam',
            name: '被套路贷包围了',
            description: '小姑是月光族，前段时间信用卡也刷爆了，刚刚收到短信：“尊敬的客户，由于政策放宽，您在我行可办理498000元借款，可用于日常消费、生意周转、房屋装修，拨打XXXXXXXXXXX咨询.”',
            coverResId: 'images.scene_online_loan_scam',
            initialMessages: [
                { type: 'message', content: '尊敬的客户，由于政策放宽，您在我行可办理498000元借款，可用于日常消费、生意周转、房屋装修，拨打XXXXXXXXXXX咨询.' },
                { type: 'event', content: '拨打电话', event: 'call_up' },
                { role: 'other', roleName: '小姑', content: '喂？刚收到你们的短信说我可以借49万8，真的假的？' },
                { role: 'liar', roleName: '客服', content: '您好，非常荣幸能为您提供服务！短信是真实的，我们银行政策确实放宽了，您现在可以申请大额的贷款。' },
                { role: 'other', roleName: '小姑', content: '这么容易就能借这么多？那我用来还信用卡可以吗？' },
                { role: 'liar', roleName: '客服', content: '当然可以，我们的贷款用途非常灵活！而且申请步骤很简单，我刚刚给您发送了一条新短信，请不要挂机，点开链接填写您的信息提交即可。' },
                { role: 'other', roleName: '小姑', content: '我已经提交，什么时候会放款？' },
                { role: 'liar', roleName: '客服', content: '' }
            ]
        });
    }

}

export default new OnlineLoanScam();