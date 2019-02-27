import React from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import { MuiThemeProvider } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import { ChildrenDemo, Trainee, Login } from './pages';
import theme from './theme';


const App = () => (
  <>
    <CssBaseline />
    <Trainee />
  </>
);

export default App;
