import type IConversation from "@/api/interfaces/IConversation.ts";
import APIException from "@/lib/exceptions/APIException.ts";
import EX from "@/api/consts/exceptions.ts";
import Conversation from "@/api/models/Conversation.ts";
import Message from "@/api/models/Message.ts";
import { scenesMap } from "@/api/scenes/index.ts";
import chat from "@/lib/chat.ts";

async function query(convId: string) {
  return await Conversation.load(convId);
}

async function create(options: IConversation) {
  const scene = getScene(options.sceneId);
  const conv = new Conversation({
    ...options,
    type: 'scene',
    name: scene.name,
    messages: scene.initialMessages
  });
  await conv.save();
  return conv;
}

async function completions(convId: string, content: string) {
  const conv = await query(convId);
  // conv.messages.push(new Message({
  //   role: '',
  //   roleName: '',
  //   content
  // }));
  const messages = conv.toCompletionMessages();
  await chat.completions(messages)
}

function getScene(sceneId: string) {
  const scene = scenesMap[sceneId];
  if (!scene) throw new APIException(EX.API_SCENE_NOT_FOUND);
  return scene;
}

export default {
  query,
  create,
  completions
};
