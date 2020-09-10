import React from 'react';
import { IFormField, defaultFormField } from '../../utils/types';
import { TextField, Button, Container, Box, Grid } from '@material-ui/core';
import { login } from '../../api/methods';
import history from '../../history';

interface LoginFormState {
  email: IFormField,
  password: IFormField
}

class LoginForm extends React.Component<{}, LoginFormState> {
  constructor(props: {}){
    super(props)
    this.state = {
      email: defaultFormField(),
      password: defaultFormField()
    }
    this.submit = this.submit.bind(this) // ou définir submit en arrow function : submit = () => {}
  }

  submit(){
    login(this.state.email.value, this.state.password.value)
      .then((_profile) => history.push('/'));
  }

  render(){
    return (
    <Container maxWidth='xs'>
      <form onSubmit={(event) => { event.preventDefault(); this.submit() }}>
        <Box style={{ margin: '2rem 0'}}>
          <TextField
            label="Email"
            value={this.state.email.value}
            required={true}
            onChange={(event) => this.setState({
              ...this.state,
              email: {value: event.target.value, isValid: true}
            })}
            fullWidth={true}
            style={{margin: '0.5rem 0'}}
            variant="outlined"
          />
          <TextField
            type="password"
            label="Password"
            required={true}
            value={this.state.password.value}
            onChange={(event) => this.setState({
              ...this.state,
              password: {value: event.target.value, isValid: true}
            })}
            fullWidth={true}
            variant="outlined"
          />
        </Box>
        <Box style={{margin: '1rem 0'}}>
          <Grid container justify='flex-end'>
            <Grid item xs={4}>
              <Button
                color="primary"
                variant="contained"
                type="submit"
                fullWidth={true}
              >
                Submit
              </Button>
            </Grid>
          </Grid>
        </Box>
      </form>
    </Container>
  )}
}

export default LoginForm;