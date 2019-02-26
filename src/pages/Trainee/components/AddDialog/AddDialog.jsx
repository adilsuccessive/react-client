import React, { Component } from 'react';
import PropTypes from 'prop-types';

import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import InputAdornment from '@material-ui/core/InputAdornment';
import Grid from '@material-ui/core/Grid';
import Person from '@material-ui/icons/Person';
import LocalPostOffice from '@material-ui/icons/LocalPostOffice';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
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
    const parseErrors = {};
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
        this.setState({
          errors: parseErrors,
        });
      })
      .catch((errors) => {
        errors.inner.forEach((error) => {
          parseErrors[error.path] = error.message;
        });
        this.setState({
          errors: parseErrors,
        });
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
                <TextField
                  label="Name"
                  value={name}
                  onChange={this.handleChange('name')}
                  fullWidth
                  margin="normal"
                  variant="outlined"
                  onBlur={this.handleBlur('name')}
                  helperText={this.getError('name')}
                  error={this.getError('name')}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <Person />
                      </InputAdornment>
                    ),
                  }}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  label="Email Address"
                  value={email}
                  onChange={this.handleChange('email')}
                  fullWidth
                  margin="normal"
                  variant="outlined"
                  onBlur={this.handleBlur('email')}
                  helperText={this.getError('email')}
                  error={this.getError('email')}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <LocalPostOffice />
                      </InputAdornment>
                    ),
                  }}
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  label="Password"
                  value={password}
                  onChange={this.handleChange('password')}
                  fullWidth
                  margin="normal"
                  variant="outlined"
                  type="password"
                  onBlur={this.handleBlur('password')}
                  helperText={this.getError('password')}
                  error={this.getError('password')}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <VisibilityOff />
                      </InputAdornment>
                    ),
                  }}
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  label="Confirm Password"
                  value={confirmPassword}
                  type="password"
                  onChange={this.handleChange('confirmPassword')}
                  fullWidth
                  margin="normal"
                  variant="outlined"
                  onBlur={this.handleBlur('confirmPassword')}
                  helperText={this.getError('confirmPassword')}
                  error={this.getError('confirmPassword')}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <VisibilityOff />
                      </InputAdornment>
                    ),
                  }}
                />
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
