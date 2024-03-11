import Scene from '@/api/models/Scene.ts';

class LostExpressScam extends Scene {

    constructor() {
        super({
            id: 'lost-express-scam',
            name: '我快递丢了？',
            description: '妹妹接到快递公司客服电话，称包裹在转运过程中丢失，根据公司规定需要进行双倍理赔，对方准确的说出了快递单号和收件人信息，需要下载指定的理赔APP并进行屏幕共享指导操作。',
            coverResId: 'images.scene_lost_express_scam',
            initialMessages: [
                { type: 'event', content: '接听电话', event: 'answer_calling' },
                { role: 'liar', roleName: '客服', content: '您好，请问是李木子吗？' },
                { role: 'other', roleName: '妹妹', content: '对，有什么事吗？' },
                { role: 'liar', roleName: '客服', content: '我们这边是通通快递，您单号为XXXXXXXXXXXXXXXX的快件包裹在转运过程中不慎丢失。' },
                { role: 'other', roleName: '妹妹', content: '不会吧。。。找不回来了吗？' },
                { role: 'liar', roleName: '客服', content: '非常抱歉给您带来不便，我们中转站确实显示包裹丢失，根据公司规定，我们可以为您提供双倍的理赔服务。' },
                { role: 'other', roleName: '妹妹', content: '真的？要怎么理赔？' },
                { role: 'liar', roleName: '客服', content: '为了确保您的权益，我们需要您下载我们的理赔专用APP“快递理赔助手”，这样我们可以指导您完成理赔流程，我已经通过短信将下载链接发到您手机号，请查收。' },
                { type: 'event', content: '下载app', event: 'download_app' },
                { role: 'other', roleName: '妹妹', content: '好的，我下载好了，现在要怎么做？' },
                { type: 'event', content: '打开app', event: 'enter_app' },
                { role: 'liar', roleName: '客服', content: '请您在APP内点击“开始理赔”，然后选择“屏幕共享”功能，这样我就能协助您完成后续步骤了。' }
            ]
        });
    }

}

export default new LostExpressScam();