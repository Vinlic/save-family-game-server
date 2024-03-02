export interface Message {
    type: string;
    roleAvatarResId: string;
    roleName: string,
    content: string;
}

interface SceneOptions {
    id: string;
    name: string;
    description: string;
    coverResId: string;
    initialMessages?: Message[];
}

export default class Scene {

    id: string;
    name: string;
    description: string;
    coverResId: string;
    initialMessages: Message[] = [];

    constructor(options: SceneOptions) {
        this.id = options.id;
        this.name = options.name;
        this.description = options.description;
        this.coverResId = options.coverResId;
        this.initialMessages = options.initialMessages || [];
    }

}