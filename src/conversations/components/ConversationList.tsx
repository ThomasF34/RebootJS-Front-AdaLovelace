import { List } from '@material-ui/core';
import React from 'react';
import { getConversations } from '../../api/methods';
import { IConversation } from '../types';
import ConversationListItem from './ConversationListItem';

interface ConversationListState {
  conversations: IConversation[];
}

class ConversationList extends React.Component<{}, ConversationListState>{
  constructor(props: {}){
    super(props);
    this.state = {
      conversations: []
    }
  }

  componentDidMount(){
    getConversations()
      .then(conversations => this.setState({conversations: conversations}))
      .catch(error => console.error(error));
  }

  render(){
    return (
      <List>
        {this.state.conversations.map((conversation, index) => <ConversationListItem conversation={conversation} key={index}/>)}
      </List>
    )
  }
}

export default ConversationList;