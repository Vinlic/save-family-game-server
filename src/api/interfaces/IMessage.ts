export default interface IMessage {
    type?: 'text' | 'image' | 'event';
    id?: string;
    role?: 'self' | 'other' | 'liar';
    roleName?: string;
    content: string;
    event?: string;
    timeout?: number;
    createTime?: number;
}