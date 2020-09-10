import React from 'react';
import { Tabs, Tab } from '@material-ui/core';
import LoginTabPanel from './LoginTabPanel';

interface LoginScreenState {
  tab: number;
}

class LoginScreen extends React.Component<{}, LoginScreenState> {
  constructor(props: {}){
    super(props);
    this.state = { tab: 0 }
  }
  render(){
    return (
      <div>
        <Tabs
          indicatorColor='primary'
          textColor='primary'
          variant="fullWidth"
          value={this.state.tab}
          onChange={(_, newTab) => {
            this.setState({tab: newTab})
          }}>
          <Tab label="login" />
          <Tab label="register" />
        </Tabs>
        <LoginTabPanel valueTab={this.state.tab} index={0}>
          <h1> Salut </h1>
        </LoginTabPanel>
        <LoginTabPanel valueTab={this.state.tab} index={1}>
          <h1> Coucou </h1>
        </LoginTabPanel>
      </div>
    )
  }
}

export default LoginScreen;