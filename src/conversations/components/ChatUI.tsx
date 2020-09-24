import React from 'react';
import { match, withRouter } from 'react-router-dom';
import { patchConversationSeen, sendMessage } from '../../api/methods';
import { IConversation } from '../types';
import ChatInput from './ChatInput';
import ChatMessages from './ChatMessages';
import history from '../../history';
import AttendeesList from './AttendeesList';
import { IAppState } from '../../appReducer';
import { connect } from 'react-redux';

interface ChatUIState {
  conversation?: IConversation;
}

interface ChatUIProps {
  match: match< {conversationId: string}>;
  location: any;
  history: any;
  conversations: IConversation[];
}

class ChatUI extends React.Component<ChatUIProps, ChatUIState>{
  constructor(props: ChatUIProps){
    super(props);
    this.state = {};
  }

  conversationSeen = () => {
    if(this.state.conversation) { patchConversationSeen(this.state.conversation._id) }
  }

  componentDidMount(){
    const conversations = this.props.conversations;
    const conversationId = this.props.match.params.conversationId;
    let conversation = conversations.find(conv => conv._id === conversationId)
    if(!conversation) {
      const target = new URLSearchParams(this.props.location.search).get('target')
      if(!target) { return history.push('/') }
      conversation = {
        _id: conversationId,
        messages: [],
        unseenMessages: 0,
        updatedAt: new Date(),
        targets: [
          target
        ]
      }
    }
    this.setState({conversation: conversation})
  }

  doSendMessage = async (message: string) => {
    const { conversation } = this.state;
    if(conversation) {
      const sentMessage = await sendMessage(conversation._id, conversation.targets, message);
      this.setState({
        conversation: {
          ...conversation,
          messages: [...conversation.messages, sentMessage]
        }
      })
    }
  }

  render(){
    if(!this.state.conversation){
      return <h1>Impossible de trouver la conversation</h1>
    } else {
      return <div
        style={{
          display: 'flex',
          flexDirection: 'row',
          height: 'calc(100% - 2rem)',
          padding: '1rem',
          boxSizing: 'border-box',
          justifyContent: 'strech',
        }} >
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              height: '100%',
              padding: '1rem',
              boxSizing: 'border-box',
              flexGrow: 1,
          }}>
            <div style={{ flexGrow: 1, overflow: 'auto' }}>
              <ChatMessages conversationSeen={this.conversationSeen} messages={this.state.conversation.messages}/>
            </div>
            <div style={{ flexGrow: 0, height: '60px' }}>
              <ChatInput doSendMessage={this.doSendMessage} conversationId={this.props.match.params.conversationId}/>
            </div>
            <div style={{ height: '100%', flexGrow: 0, width: '15%' }}>
              <AttendeesList targets={this.state.conversation?.targets} />
            </div>
          </div>
        </div>
    }

  }
}

const mapStateToProps = ({ conversation }: IAppState) => ({
  conversations: conversation.list
})
export default connect(mapStateToProps)(withRouter(ChatUI));