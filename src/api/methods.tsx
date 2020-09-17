import { User } from "../users/types";
import axios from 'axios';
import { IProfile } from "../profile/types";
import { IConversation } from "../conversations/types";

// fetch users via the server
export function getUsers(): Promise<User[]> {
  return axios.get(`${process.env.REACT_APP_BACKEND}/profile`)
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

export async function getConversations(): Promise<IConversation[]>{
  const resp = await axios.get(`${process.env.REACT_APP_BACKEND}/messages`, { withCredentials: true })
  return resp.data;
}

export async function getConversation(conversationId: string): Promise<IConversation[]>{
  const resp = await axios.get(`${process.env.REACT_APP_BACKEND}/messages/${conversationId}`, { withCredentials: true })
  return resp.data;
}

export async function sendMessage(conversationId: string, targets: string[], content: string){
  const resp = await axios.post(`${process.env.REACT_APP_BACKEND}/messages`,
    {
      conversationId, targets, content
    },
    {
      withCredentials: true
    });
  return resp.data;
}