import { Avatar, ListItem, ListItemAvatar, ListItemText } from '@material-ui/core';
import { AvatarGroup } from '@material-ui/lab';
import React from 'react';
import { IConversation } from '../types';

interface ConversationListItemProps {
  conversation: IConversation;
}

class ConversationListItem extends React.Component<ConversationListItemProps>{
  render(){
    return (
    <ListItem>
      <ListItemAvatar>
        <AvatarGroup max={3}>
          {this.props.conversation.targets.map(target => <Avatar>{target[0]}</Avatar>)}
        </AvatarGroup>
      </ListItemAvatar>
      <ListItemText
        primary={this.props.conversation.messages[0].content}
        secondary={this.props.conversation.updatedAt.toLocaleString()}>
      </ListItemText>
    </ListItem>
    )
  }
}

export default ConversationListItem;