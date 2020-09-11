import { Box, Button, Container, Grid } from '@material-ui/core';
import React from 'react';
import { register } from '../../api/methods';
import history from '../../history';
import { Alert } from '@material-ui/lab';
import { defaultFormField, defaultPasswordField, IProfileFormFields } from '../../utils/types';
import IdentitySection from './IdentitySection';
import { validateRequiredField } from '../../utils/validateRequiredField';
import CredentialsSection from './CredentialsSection';

export interface IRegistrationFormState {
  status: 'ready' | 'success' | 'error';
  fields: IProfileFormFields;
}

class RegistrationForm extends React.Component<{}, IRegistrationFormState> {
  constructor(props: {}) {
    super(props);
    this.state = {
      status: 'ready',
      fields: {
        email: defaultFormField(),
        firstname: defaultFormField(),
        lastname: defaultFormField(),
        password: defaultPasswordField(),
        confirmation: defaultFormField(),
      }
    }
  };

  saveProfile = (): void => {
    const { email, firstname, lastname, password } = this.state.fields;
    register(email.value, password.value, firstname.value, lastname.value)
      .then(_profile => history.push(`profile`))
      .catch(_error => this.setState({ status: 'error'}));
  }


  changeField = (field: 'email' | 'firstname' | 'lastname' | 'password' | 'confirmation'): ((value: string) => void) => {
    return (value: string) => {
      this.setState({
        fields: {
          ...this.state.fields,
          [field]: { value: value, isValid: validateRequiredField(value)}
        }
      });
    }
  }

  render() {
    const { email, firstname, lastname, password, confirmation } = this.state.fields;
    const { status } = this.state
    return (
      <Container>
        <Box style={{ margin: '2rem 0' }}>
          {status !== 'ready' ?
          <Alert severity={status}>
            {status === 'success' ? 'Utilisateur créé' : 'Problème lors de la création'}
          </Alert> : null }
        </Box>
        <form onSubmit={(e) => { e.preventDefault(); this.saveProfile() }}>
          <Box style={{ margin: '2rem 0' }}>
            <Grid container justify="space-evenly" alignItems="flex-start">
              <Grid item xs={4}>
                <IdentitySection
                  email={email}
                  firstname={firstname}
                  lastname={lastname}
                  changeEmail={this.changeField("email")}
                  changeFirstname={this.changeField("firstname")}
                  changeLastname={this.changeField("lastname")}
                />
              </Grid>
              <Grid item xs={4}>
                <CredentialsSection
                  password={password}
                  confirmation={confirmation}
                  changePassword={this.changeField("password")}
                  changeConfirmation={this.changeField("confirmation")}
                />
              </Grid>
            </Grid>
          </Box>
          <Box style={{ margin: '2rem 0' }}>
            <Grid container justify="flex-end">
              <Grid item xs={2}>
                <Button variant="contained" color="primary" fullWidth={true} type="submit">
                  Register
              </Button>
              </Grid>
            </Grid>
          </Box>
        </form>
      </Container>
    );
  }
}

export default RegistrationForm;