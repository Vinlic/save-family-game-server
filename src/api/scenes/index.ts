import { Scene } from '@/api/models/Scene.ts';
import giftRedemptionScam from "./gift-redemption-scam.ts";
import resumeScam from "./resume-scam.ts";
import teaPickingGirlScam from "./tea-picking-girl-scam.ts";
import burshingOrdersScam from "./brushing-orders-scam.ts";
import internetDatingScam from "./internet-dating-scam.ts";
import nudeChatScam from "./nude-chat-scam.ts";
import lostExpressScam from "./lost-express-scam.ts";
import familyAccidentScam from "./family-accident-scam.ts";
import mentalManipulationScam from "./mental-manipulation-scam.ts";
import impersonatingPublicSecurityProcuratorateScam from "./impersonating-public-security-procuratorate-scam.ts";
import onlineLoanScam from "./online-loan-scam.ts";
import mlmScam from "./mlm-scam.ts";
import aiVtuberScam from "./ai-vtuber-scam.ts";
import pensionProductScam from "./pension-product-scam.ts";
import healthProductScam from "./health-product-scam.ts";
import witchScam from "./witch-scam.ts";

const scenes = [

    // 礼品兑换骗局
    giftRedemptionScam,

    // 招聘骗局
    resumeScam,

    // 采茶女骗局
    teaPickingGirlScam,

    // 刷单骗局
    burshingOrdersScam,

    // 网络交友骗局
    internetDatingScam,

    // 裸聊骗局
    nudeChatScam,

    // 快递丢失骗局
    lostExpressScam,

    // 家人意外骗局
    familyAccidentScam,

    // 精神操控骗局
    mentalManipulationScam,

    // 冒充公检法骗局
    impersonatingPublicSecurityProcuratorateScam,

    // 网贷骗局
    onlineLoanScam,

    // 传销骗局
    mlmScam,

    // AI数字人骗局
    aiVtuberScam,

    // 养老产品骗局
    pensionProductScam,

    // 保健品骗局
    healthProductScam,

    // 神婆骗局
    witchScam


] as Scene[];

const _scenesMap: Record<string, Scene> = {};
scenes.forEach(scene => _scenesMap[scene.id] = scene);

export const scenesMap = _scenesMap;
export default scenes;