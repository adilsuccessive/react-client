import React from 'react';
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

const Navbar = (props) => {
  const { classes } = props;
  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" color="inherit" className={classes.grow}>
            Trainee Portal
          </Typography>
          <Link component={RouterLink} to="/" color="inherit" underline="none">
            <Button color="inherit" disableRipple>Trainee</Button>
          </Link>
          <Link component={RouterLink} to="/text-field-demo" color="inherit" underline="none">
            <Button color="inherit" disableRipple>Text Field Demo</Button>
          </Link>
          <Link component={RouterLink} to="/input-demo" color="inherit" underline="none">
            <Button color="inherit" disableRipple>Input Demo</Button>
          </Link>
          <Link component={RouterLink} to="/children-demo" color="inherit" underline="none">
            <Button color="inherit" disableRipple>Children Demo</Button>
          </Link>
          <Link component={RouterLink} to="/login" color="inherit" underline="none">
            <Button color="inherit" disableRipple className={classes.button}>LOGOUT</Button>
          </Link>
        </Toolbar>
      </AppBar>
    </div>
  );
};

Navbar.propTypes = {
  classes: PropTypes.objectOf(PropTypes.string).isRequired,
};

export default withStyles(styles)(Navbar);
