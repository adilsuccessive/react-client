import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  DialogActions, DialogContent, DialogTitle, TextField,
  Button, InputAdornment, Grid, Avatar, Paper,
} from '@material-ui/core';
import { LocalPostOffice, Lock, VisibilityOff } from '@material-ui/icons';
import { withStyles } from '@material-ui/core/styles';
import pink from '@material-ui/core/colors/pink';
import * as yup from 'yup';

const styles = theme => ({
  root: {
    padding: theme.spacing.unit * 2,
    marginTop: theme.spacing.unit * 10,
    marginLeft: theme.spacing.unit * 55,
    marginRight: theme.spacing.unit * 55,
  },
  pinkAvatar: {
    margin: 10,
    color: '#fff',
    backgroundColor: pink[500],
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
    } = this.state;

    return (
      <Paper className={classes.root} elevation={5}>
        <div align="center"><Avatar className={classes.pinkAvatar}><Lock color="default" /></Avatar></div>
        <DialogTitle align="center">Login</DialogTitle>
        <DialogContent>
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
        <DialogActions>
          <Button
            color="primary"
            variant="contained"
            fullWidth
            size="large"
            disabled={this.hasErrors() || !this.isTouched()}
          >
            Submit
          </Button>
        </DialogActions>
      </Paper>
    );
  }
}

Login.propTypes = {
  classes: PropTypes.objectOf(PropTypes.string).isRequired,
};

export default withStyles(styles)(Login);
