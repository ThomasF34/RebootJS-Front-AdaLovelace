import React from 'react';
import './App.css';
import MyContacts from './users/components/MyContacts';
import { createMuiTheme, ThemeProvider } from '@material-ui/core';
import { blue, yellow } from '@material-ui/core/colors';

const theme = createMuiTheme({
    palette: {
      primary: blue,
      secondary: yellow,
    },
})

function App() {
  return (
    <ThemeProvider theme={theme}>
      <MyContacts />
    </ThemeProvider>
  );
}

export default App;
