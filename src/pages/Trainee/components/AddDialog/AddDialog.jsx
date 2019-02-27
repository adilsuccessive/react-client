import React, { Component } from 'react';
import PropTypes from 'prop-types';

import {
  Dialog, DialogActions, DialogContent, DialogContentText,
  DialogTitle, TextField, Button, InputAdornment, Grid,
} from '@material-ui/core';
import { Person, LocalPostOffice, VisibilityOff } from '@material-ui/icons';
import { withStyles } from '@material-ui/core/styles';
import * as yup from 'yup';

const styles = theme => ({
  root: {
    flexGrow: 1,
    padding: theme.spacing.unit * 2,
  },
});

const schema = yup.object({
  name: yup.string().required().label('Name'),
  email: yup.string().email().required().label('Email Address'),
  password: yup.string()
    .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/, 'Must contains 8 characters, at least one uppercase letter, one lowercase letter and one number')
    .required('Password is required'),
  confirmPassword: yup.string().required('Confirm Password is required')
    .oneOf([yup.ref('password'), null], 'Must match password'),
});

class AddDialog extends Component {
  state = {
    errors: {},
    touch: {},
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  };

  handleSubmit = () => {
    const {
      name,
      email,
      password,
    } = this.state;

    const { onSubmit } = this.props;
    onSubmit({
      name,
      email,
      password,
    });
  }

  handleBlur = field => () => {
    const { touch } = this.state;
    touch[field] = true;

    this.setState({
      touch,
    }, () => this.handleValidate());
  }

  handleValidate = () => {
    const {
      name,
      email,
      password,
      confirmPassword,
    } = this.state;

    schema.validate({
      name,
      email,
      password,
      confirmPassword,
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
      open,
      onClose,
      classes,
    } = this.props;

    const {
      email,
      name,
      password,
      confirmPassword,
    } = this.state;

    return (
      <Dialog open={open} onClose={onClose} fullWidth>
        <DialogTitle>Add Trainee</DialogTitle>
        <DialogContent>
          <DialogContentText>Enter your trainee details</DialogContentText>
          <div className={classes.root}>
            <Grid container spacing={24}>
              <Grid item xs={12}>
                {this.renderTextField(
                  'Name',
                  name,
                  'name',
                  <Person />,
                  'text',
                )}
              </Grid>
              <Grid item xs={12}>
                {this.renderTextField(
                  'Email Address',
                  email,
                  'email',
                  <LocalPostOffice />,
                  'text',
                )}
              </Grid>
              <Grid item xs={6}>
                {this.renderTextField(
                  'Password',
                  password,
                  'password',
                  <VisibilityOff />,
                  'password',
                )}
              </Grid>
              <Grid item xs={6}>
                {this.renderTextField(
                  'Confirm Password',
                  confirmPassword,
                  'confirmPassword',
                  <VisibilityOff />,
                  'password',
                )}
              </Grid>
            </Grid>
          </div>
        </DialogContent>
        <DialogActions>
          <Button color="primary" onClick={onClose}>
            Cancel
          </Button>
          <Button
            color="primary"
            variant="contained"
            onClick={this.handleSubmit}
            disabled={this.hasErrors() || !this.isTouched()}
          >
            Submit
          </Button>
        </DialogActions>
      </Dialog>
    );
  }
}

AddDialog.propTypes = {
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
  classes: PropTypes.objectOf(PropTypes.string).isRequired,
};

export default withStyles(styles)(AddDialog);
