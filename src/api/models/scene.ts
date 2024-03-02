import _ from 'lodash';

import type { Message } from './conversation.ts';

export interface SceneOptions {
    id: string;
    name: string;
    description: string;
    coverResId: string;
    initialMessages?: Message[];
}

export class Scene {

    id: string;
    name: string;
    description: string;
    coverResId: string;
    initialMessages: Message[];

    constructor(options: SceneOptions) {
        this.id = options.id;
        this.name = options.name;
        this.description = options.description;
        this.coverResId = options.coverResId;
        this.initialMessages = _.defaultTo(options.initialMessages, []);
    }

}