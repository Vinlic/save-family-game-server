export class Scene {

    id;
    name;
    description;
    coverResId;
    initialMessages[] = [];

    constructor(options: SceneOptions) {
        this.id = options.id;
        this.name = options.name;
        this.description = options.description;
        this.coverResId = options.coverResId;
        this.initialMessages = options.initialMessages || [];
    }

}