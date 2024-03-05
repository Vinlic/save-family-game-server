import IMessage from './IMessage.ts';

export default interface IConversation {
    type: string;
    id?: string;
    name: string;
    messages?: IMessage[];
    fromTicketId: string;
}