import Scene from '@/api/models/Scene.ts';

class MentalManipulationScam extends Scene {

    constructor() {
        super({
            id: 'mental-manipulation-scam',
            name: '提线木偶',
            description: '大哥每天抱着手机聊天，据说在和网上刚处的女友聊天，就是情绪不太稳定，时而悲伤沮丧、时而快乐兴奋，近来还找了许多人借钱，刚刚过来找你：“老三，有闲钱不，女朋友说再转6000给他买个包，我还差2600，她过两个月就来见我了！”',
            coverResId: 'images.scene_mental_manipulation_scam',
            initialMessages: [
                { role: 'other', roleName: '大哥', content: '老三，在不在？有个急事找你帮忙。' },
                { role: 'self', roleName: '我', content: '咋了？啥事这么急？' },
                { role: 'other', roleName: '大哥', content: '你也知道，我最近在网上谈了个女朋友，感情挺好的。' },
                { role: 'self', roleName: '我', content: '我知道，但是我感觉你谈的不怎么开心啊，小心被PUA了啊。' },
                { role: 'other', roleName: '大哥', content: '没有没有，我们挺好的，就是唉，最近她想要个包包，说了好久了，我答应给她买，问题是...我手头紧，那包6000我还差2600，你能借我点吗？' },
                { role: 'self', roleName: '我', content: '6000？这数目不算小啊，你确定她值得你这么付出？' },
                { role: 'other', roleName: '大哥', content: '她说过两个月就来见我了，我觉得这是个机会，想好好把握。' }
            ]
        });
    }

}

export default new MentalManipulationScam();