import { Scene } from '@/api/models/scene.ts';

class ImpersonatingPublicSecurityProcuratorateScam extends Scene {

    constructor() {
        super({
            id: 'impersonating-public-security-procuratorate-scam',
            name: '喂？我是警察！',
            description: '在外工作的哥哥突然接到电话，对方自称所在辖区派出所民警，一起诈骗洗钱犯罪与他有关，需要配合调查，要求下载视频会议APP并进行屏幕共享，验证资金情况后转入临时安全账户。',
            coverResId: 'images.scene_impersonating_public_security_procuratorate_scam' 
        });
    }

}

export default new ImpersonatingPublicSecurityProcuratorateScam();