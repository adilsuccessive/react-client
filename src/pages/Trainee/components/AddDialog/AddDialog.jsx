import React, { Component } from 'react';
import PropTypes from 'prop-types';

import {
  Dialog, DialogActions, DialogContent, DialogContentText,
  DialogTitle, TextField, Button, InputAdornment, Grid,
} from '@material-ui/core';
import CircularProgress from '@material-ui/core/CircularProgress';
import { Person, LocalPostOffice, VisibilityOff } from '@material-ui/icons';
import { withStyles } from '@material-ui/core/styles';
import * as yup from 'yup';
import callApi from '../../../../lib/utils/api';
import { SnackBarConsumer } from '../../../../contexts/SnackBarProvider/SnackBarProvider';

const styles = theme => ({
  root: {
    flexGrow: 1,
    padding: theme.spacing.unit * 2,
  },
  spinPosition: {
    position: 'absolute',
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
    loading: false,
  };

  handleSubmit = async (openSnackbar) => {
    const {
      name,
      email,
      password,
    } = this.state;
    this.setState({
      loading: true,
    });
    const data = { name, email, password };
    const resp = await callApi(data, 'post', 'trainee');
    if (resp.data) {
      openSnackbar(`${resp.status} ${resp.data.message}`, 'success');
    } else {
      openSnackbar(`${resp}`, 'error');
    }

    const { onSubmit } = this.props;
    onSubmit({
      name,
      email,
      password,
    });
    this.setState({
      loading: false,
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
      loading,
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
          <SnackBarConsumer>
            {({ openSnackbar }) => (
              <Button
                color="primary"
                variant="contained"
                // onClick={this.handleSubmit}
                onClick={() => this.handleSubmit(openSnackbar)}
                disabled={(this.hasErrors() || !this.isTouched()) || loading}
              >
                {loading && <CircularProgress size={24} className={classes.spinPosition} />}
            Submit
              </Button>
            )}
          </SnackBarConsumer>
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
