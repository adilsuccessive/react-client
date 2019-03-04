import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link as RouterLink } from 'react-router-dom';
import { withStyles } from '@material-ui/core/styles';
import {
  AppBar, Toolbar, Typography, Button, Link,
} from '@material-ui/core';

const styles = theme => ({
  root: {
    flexGrow: 1,
    margin: -10,
    marginBottom: 20,
  },
  grow: {
    flexGrow: 1,
  },
  button: {
    marginLeft: theme.spacing.unit * 2,
  },
});

const link = [
  {
    to: '/',
    label: 'Trainee',
  },
  {
    to: '/text-field-demo',
    label: 'Text Field Demo',
  },
  {
    to: 'input-demo',
    label: 'Input Demo',
  },
  {
    to: 'children-demo',
    label: 'Children Demo',
  },
];

class Navbar extends Component {
  renderLink = data => (
    data.map(val => (
      <Link component={RouterLink} to={val.to} color="inherit" underline="none">
        <Button color="inherit" disableRipple>{val.label}</Button>
      </Link>
    ))
  )

  render() {
    const { classes } = this.props;
    return (
      <div className={classes.root}>
        <AppBar position="static">
          <Toolbar>
            <Typography variant="h6" color="inherit" className={classes.grow}>
            Trainee Portal
            </Typography>
            {this.renderLink(link)}
            <Link component={RouterLink} to="/login" color="inherit" underline="none">
              <Button color="inherit" disableRipple className={classes.button}>LOGOUT</Button>
            </Link>
          </Toolbar>
        </AppBar>
      </div>
    );
  }
}

Navbar.propTypes = {
  classes: PropTypes.objectOf(PropTypes.string).isRequired,
};

export default withStyles(styles)(Navbar);
