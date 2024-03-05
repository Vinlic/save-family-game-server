import type IMessage from './IMessage.ts';

export default interface IScene {
    id: string;
    name: string;
    description: string;
    coverResId: string;
    initialMessages?: IMessage[];
}