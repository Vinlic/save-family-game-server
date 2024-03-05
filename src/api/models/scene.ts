import _ from 'lodash';

import type IScene from '../interfaces/IScene.ts';
import Message from './Message.ts';
import util from '@/lib/util.ts';

export class Scene {

    id: string;
    name: string;
    description: string;
    coverResId: string;
    initialMessages: Message[];

    constructor(options: IScene) {
        this.id = options.id || util.uuid();
        this.name = options.name;
        this.description = options.description;
        this.coverResId = options.coverResId;
        this.initialMessages = _.defaultTo(options.initialMessages, []);
    }

}