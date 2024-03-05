export default interface Message {
    type: string;
    id?: string;
    roleAvatarResId: string;
    roleName: string;
    content: string;
}