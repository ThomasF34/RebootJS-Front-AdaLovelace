import React from 'react';
import ContactListItem from './ContactListItem';
import { User } from '../types';
import { getUsers } from '../../api/methods';

interface ContactListState {
  users: User[];
}

class ContactList extends React.Component<{}, ContactListState>{
  constructor(props: {}){
    super(props)
    this.state = {
      users: []
    }
  }

  componentDidMount(){
    getUsers().then(fetchedUsers => { this.setState({users: fetchedUsers})})
  }

  render(){
    return <div>
      <h1>Liste de contact</h1>
      <ul>
        {this.state.users.map((user) => <li><ContactListItem firstname={user.firstname} lastname={user.lastname}/></li>)}
      </ul>
      </div>
  }
}

export default ContactList;