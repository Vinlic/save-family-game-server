import Scene from '@/api/models/Scene.ts';

class ImpersonatingPublicSecurityProcuratorateScam extends Scene {

    constructor() {
        super({
            id: 'impersonating-public-security-procuratorate-scam',
            name: '喂？我是警察！',
            description: '在外工作的哥哥突然接到电话，对方自称所在辖区派出所民警，一起诈骗洗钱犯罪与他有关，需要配合调查，要求下载视频会议APP并进行屏幕共享，验证资金情况后转入临时安全账户。',
            coverResId: 'images.scene_impersonating_public_security_procuratorate_scam',
            initialMessages: [
                { type: 'event', content: '接听电话', event: 'answer_calling' },
                { role: 'other', roleName: '哥哥', content: '喂，你好，哪位？' },
                { role: 'liar', roleName: '民警', content: '你好，我是你所在辖区派出所的民警。我们这里接到一个案件，涉及到一起诈骗洗钱犯罪，你的银行账户可能被用于非法交易。我们需要你配合调查。' },
                { role: 'other', roleName: '哥哥', content: '啊？这怎么可能？我什么都没做啊！' },
                { role: 'liar', roleName: '民警', content: '你先别着急，只要配合我们的工作就可以，现在需要你下载一个视频会议APP，进行屏幕共享，以便我们验证你的资金情况，不要挂断电话' },
                { role: 'other', roleName: '哥哥', content: '好吧，我先下载看看，这个APP叫什么？' },
                { role: 'liar', roleName: '民警', content: 'APP叫做“安全验证会议”，你下载后告诉我，我会告诉你下一步怎么做。' },
                { type: 'event', content: '下载app', event: 'download_app' },
                { role: 'other', roleName: '哥哥', content: '我下载好了，接下来呢？' },
                { role: 'liar', roleName: '民警', content: '现在请你打开APP，会议号：XXX-XXX-XXX，你加入后我们就可以开始屏幕共享了。' },
                { type: 'event', content: '打开app', event: 'enter_app' },
                { role: 'other', roleName: '哥哥', content: '好的，我加入了。现在怎么办？' },
                { role: 'liar', roleName: '民警', content: '请你打开你的银行账户，我们需要查看一下你的资金情况。然后我们会指导你将资金转入一个临时的安全账户，以确保资金不被非法使用。' }
            ]
        });
    }

}

export default new ImpersonatingPublicSecurityProcuratorateScam();