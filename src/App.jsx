import React from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import { MuiThemeProvider } from '@material-ui/core/styles';
import { BrowserRouter as Router, Switch } from 'react-router-dom';
import {
  ChildrenDemo, Trainee, Login,
  NotFound, InputDemo, TextFieldDemo,
} from './pages';
import { PrivateRoute, AuthRoute } from './routes';
import theme from './theme';

const App = () => (
  <>
    <MuiThemeProvider theme={theme}>
      <CssBaseline />
      <Router>
        <Switch>
          <AuthRoute exact path="/login" component={Login} />
          {/* <PrivateRoute exact path="/" component={Trainee} /> */}
          <PrivateRoute exact path="/input-demo" component={InputDemo} />
          <PrivateRoute exact path="/text-field-demo" component={TextFieldDemo} />
          <PrivateRoute exact path="/children-demo" component={ChildrenDemo} />
          <PrivateRoute path="/trainee" component={Trainee} />
          <PrivateRoute component={NotFound} />
        </Switch>
      </Router>
    </MuiThemeProvider>
  </>
);

export default App;
