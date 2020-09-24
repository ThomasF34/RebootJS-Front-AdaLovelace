import { User } from "../users/types";
import axios from 'axios';
import { IProfile } from "../profile/types";
import { IConversation, IConversationMessage } from "../conversations/types";

// fetch users via the server
export function getUsers(): Promise<User[]> {
  return axios.get(`${process.env.REACT_APP_BACKEND}/profile`, { withCredentials: true })
    .then(resp => {
      return resp.data
    })
}

export function getConnectedProfile(): Promise<User> {
  return axios.get( `${process.env.REACT_APP_BACKEND}/profile/me`, { withCredentials: true }
  ).then(resp => resp.data)
}

export function login(email: string, password: string): Promise<IProfile>{
  return axios
    .post(
      `${process.env.REACT_APP_BACKEND}/login`,
      {
        username: email,
        password: password
      },
      {
        withCredentials: true
      })
    .then(resp => resp.data)
}

export function register(email: string, password: string, firstname: string, lastname: string) : Promise<IProfile>{
  return axios.post(`${process.env.REACT_APP_BACKEND}/profile`, { email, password, firstname, lastname })
    .then(resp => resp.data);
}

export async function getConversations(connectedUser: User): Promise<IConversation[]>{
  //Fetch des messages à l'api
  const resp = await axios.get(`${process.env.REACT_APP_BACKEND}/messages`, { withCredentials: true })
  const messages: IConversationMessage[] = resp.data;

  //Traitement sur les messages : messages => conversations
  if (messages.length === 0) return []

  const batches = messages.reduce<{ [conversationId: string]: IConversationMessage[] }>(
    (acc, message) => ({
      ...acc,
      [message.conversationId]: [...(acc[message.conversationId] || []), message],
    }),
    {},
  );

    // {
    //   'abcd': [message1, message2],
    //   'abcde': [message3]
    // }

    // [message1, message2, message3, message4]

    // {}

    // { 
    //   'abcd': [message1]
    // }

    // { 
    //   'abcd': [message1, message2]
    // }

    // { 
    //   'abcd': [message1, message2],
    //   'abcde': [message3]
    // }

    // {
    //   'abcd': [message1, message2, message4],
    //   'abcde': [message3]
    // }
  const conversations : IConversation[] = [];
  for (const conversationId in batches) {
    const messages = batches[conversationId];

    const attendees = [...new Set(messages.flatMap(({ emitter, targets }) => [emitter, ...targets]))];
    // [1, 2, 3].map(el => el * 2) renvoie [2, 4, 6]
    // [ [ 1, 2, 3 ].flatMap(el => [el, el * 2])
      // [ 1, 2, 3 ].map(el => [el, el * 2]) renvoie [[1, 2], [2, 4], [3, 6]]
      // [[1, 2], [2, 4], [3, 6]] flatten [ 1, 2, 2, 4, 3, 6 ]

    // messages = [
    //  {emitter: 'idEmitter', targets: 'idTarget1' , 'idTarget2'},
    //  {emitter: 'idEmitter2', targets: 'idTarget2'}
    // ]
    // messages.map(message => [message.emitter, ...message.targets]);
    // [[ 'idEmitter', 'idTarget1' , 'idTarget2' ], ['idEmitter2', 'idTarget2' ] ] (res du map)
    // [ 'idEmitter', 'idTarget1' , 'idTarget2', 'idEmitter2', 'idTarget2' ] (res du flatten)
    // Set('idEmitter', 'idTarget1' , 'idTarget2', 'idEmitter2') (res du cast vers le Set)

    const targets = attendees.filter((id) => id !== connectedUser._id);

    conversations.push({
      _id: conversationId,
      targets: targets,
      messages: messages,
      updatedAt: getLastMessageDate(messages),
      unseenMessages: 0
    })
  }
  return conversations;
}

export async function getConversation(conversationId: string): Promise<IConversation[]>{
  const resp = await axios.get(`${process.env.REACT_APP_BACKEND}/messages/${conversationId}`, { withCredentials: true })
  return resp.data;
}

export async function sendMessage(conversationId: string, targets: string[], content: string): Promise<IConversationMessage>{
  const resp = await axios.post(`${process.env.REACT_APP_BACKEND}/messages`,
    {
      conversationId, targets, content
    },
    {
      withCredentials: true
    });
  return resp.data;
}

export async function patchConversationSeen(conversationId: string): Promise<IProfile>{
  const resp = await axios.patch(
    `${process.env.REACT_APP_BACKEND}/profile/conversation-seen/${conversationId}`,
    {},
    { withCredentials: true }
  );
  return resp.data;
}

function getLastMessageDate(messages: IConversationMessage[]) {
  return messages[messages.length - 1].createdAt;
}