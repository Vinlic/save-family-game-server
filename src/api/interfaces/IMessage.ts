export default interface IMessage {
    type: string;
    id?: string;
    roleAvatarResId: string;
    roleName: string;
    content: string;
}