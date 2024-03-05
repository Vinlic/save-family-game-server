import { Scene } from '@/api/models/Scene.ts';

class ResumeScam extends Scene {

    constructor() {
        super({
            id: 'resume-scam',
            name: '恶魔的招聘',
            description: '侄子大学毕业已经一年，却没找到合心意的工作，今天招聘软件突然收到一家公司发起的职位投递邀请，岗位名称是“高级工程师”，薪资待遇相较同类岗位都高不少，前往现场面试时，对方要求先交一笔培训费用，培训后才能上岗。',
            coverResId: 'images.scene_resume_scam' 
        });
    }

}

export default new ResumeScam();