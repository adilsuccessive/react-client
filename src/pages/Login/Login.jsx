import React, { Component } from 'react';
import PropTypes from 'prop-types';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import InputAdornment from '@material-ui/core/InputAdornment';
import Grid from '@material-ui/core/Grid';
import LocalPostOffice from '@material-ui/icons/LocalPostOffice';
import Avatar from '@material-ui/core/Avatar';
import Lock from '@material-ui/icons/Lock';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
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
    const parseErrors = {};
    const {
      email,
      password,
    } = this.state;

    schema.validate({
      email,
      password,
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
              <Grid item xs={12}>
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
