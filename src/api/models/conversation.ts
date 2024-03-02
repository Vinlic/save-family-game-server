export interface Message {
    type: string;
    id: string;
    roleAvatarResId: string;
    roleName: string;
    content: string;
}

export class Conversation {
    type: string;
    id: string;
    name: string;
    messages: Message[];
    fromTicketId: string;
}