import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  DialogActions, DialogContent, DialogTitle, TextField,
  Button, InputAdornment, Grid, Avatar, Paper,
} from '@material-ui/core';
import { LocalPostOffice, Lock, VisibilityOff } from '@material-ui/icons';
import { withStyles } from '@material-ui/core/styles';
import * as yup from 'yup';
import CircularProgress from '@material-ui/core/CircularProgress';
import callApi from '../../lib/utils/api';
import { SnackBarConsumer } from '../../contexts/SnackBarProvider/SnackBarProvider';

const styles = theme => ({
  main: {
    width: 'auto',
    display: 'block', // Fix IE 11 issue.
    marginLeft: theme.spacing.unit * 3,
    marginRight: theme.spacing.unit * 3,
    [theme.breakpoints.up(400 + theme.spacing.unit * 3 * 2)]: {
      width: 400,
      marginLeft: 'auto',
      marginRight: 'auto',
    },
  },
  paper: {
    marginTop: theme.spacing.unit * 8,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: `${theme.spacing.unit * 2}px ${theme.spacing.unit * 3}px ${theme.spacing.unit * 3}px`,
  },
  avatar: {
    margin: theme.spacing.unit,
    backgroundColor: theme.palette.secondary.main,
  },
  content: {
    width: '100%',
    marginTop: theme.spacing.unit,
  },
  submit: {
    width: '95%',
    marginTop: theme.spacing.unit,
  },
  spinPosition: {
    position: 'absolute',
  },
});

const schema = yup.object({
  email: yup.string().email().required().label('Email Address'),
  password: yup.string().required().label('Password'),
});

class Login extends Component {
  state = {
    errors: {},
    touch: {},
    email: '',
    password: '',
    loading: false,
  };

  handleButtonClick = async (openSnackbar) => {
    const { email, password } = this.state;
    const data = { email, password };
    this.setState({
      loading: true,
    });
    const { history } = this.props;
    const resp = await callApi(data, 'post', 'user/login');
    if (resp.data) {
      localStorage.setItem('token', resp.data);
      history.push('/trainee');
    } else {
      openSnackbar(`${resp}`, 'error');
    }
    this.setState({
      loading: false,
    });
  };

  handleBlur = field => () => {
    const { touch } = this.state;
    touch[field] = true;

    this.setState({
      touch,
    }, () => this.handleValidate());
  }

  handleValidate = () => {
    const {
      email,
      password,
    } = this.state;

    schema.validate({
      email,
      password,
    }, { abortEarly: false })
      .then(() => {
        this.handleError(null);
      })
      .catch((errors) => {
        this.handleError(errors);
      });
  }

  handleError = (errors) => {
    const parsedErrors = {};
    if (errors) {
      errors.inner.forEach((error) => {
        parsedErrors[error.path] = error.message;
      });
    }
    this.setState({
      errors: parsedErrors,
    });
  }

  handleChange = field => (event) => {
    this.setState({
      [field]: event.target.value,
    }, () => this.handleValidate());
  }

  getError = (field) => {
    const { errors, touch } = this.state;

    if (!touch[field]) {
      return null;
    }

    return errors[field] || '';
  }

  hasErrors = () => {
    const { errors } = this.state;
    return Object.keys(errors).length !== 0;
  }

  isTouched = () => {
    const { touch } = this.state;
    return Object.keys(touch).length !== 0;
  }

  renderTextField = (label, value, name, icon, type) => (
    <TextField
      label={label}
      value={value}
      name={name}
      type={type}
      onChange={this.handleChange(name)}
      fullWidth
      margin="normal"
      variant="outlined"
      onBlur={this.handleBlur(name)}
      helperText={this.getError(name)}
      error={this.getError(name)}
      InputProps={{
        startAdornment: (
          <InputAdornment position="start">
            {icon}
          </InputAdornment>
        ),
      }}
    />
  )

  render() {
    const {
      classes,
    } = this.props;

    const {
      email,
      password,
      loading,
    } = this.state;

    return (
      <main className={classes.main}>
        <Paper className={classes.paper} elevation={5}>
          <div align="center"><Avatar className={classes.avatar}><Lock color="default" /></Avatar></div>
          <DialogTitle align="center">Login</DialogTitle>
          <DialogContent className={classes.content}>
            <div>
              <Grid container spacing={24}>
                <Grid item xs={12}>
                  {this.renderTextField(
                    'Email Address',
                    email,
                    'email',
                    <LocalPostOffice />,
                    'text',
                  )}
                </Grid>
                <Grid item xs={12}>
                  {this.renderTextField(
                    'Password',
                    password,
                    'password',
                    <VisibilityOff />,
                    'password',
                  )}
                </Grid>
              </Grid>
            </div>
          </DialogContent>
          <DialogActions className={classes.submit}>
            <SnackBarConsumer>
              {({ openSnackbar }) => (
                <Button
                  color="primary"
                  variant="contained"
                  size="large"
                  onClick={() => this.handleButtonClick(openSnackbar)}
                  disabled={(this.hasErrors() || !this.isTouched()) || loading}
                  className={classes.submit}
                >
                  {loading && <CircularProgress size={24} className={classes.spinPosition} />}
              Submit
                </Button>
              )}
            </SnackBarConsumer>
          </DialogActions>
        </Paper>
      </main>
    );
  }
}

Login.propTypes = {
  classes: PropTypes.objectOf(PropTypes.string).isRequired,
  history: PropTypes.objectOf(PropTypes.any).isRequired,
};

export default withStyles(styles)(Login);
