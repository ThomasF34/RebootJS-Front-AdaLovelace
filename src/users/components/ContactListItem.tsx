import React from 'react';

interface ContactListItemProps {
  firstname: string;
  lastname: string;
}

class ContactListItem extends React.Component<ContactListItemProps>{
  render(){
    return <p>Name: {this.props.firstname} {this.props.lastname}</p>
  }
}

export default ContactListItem;