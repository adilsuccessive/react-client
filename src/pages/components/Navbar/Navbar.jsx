import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';

const styles = theme => ({
  root: {
    flexGrow: 1,
    margin: -10,
    marginBottom: 20,
  },
  grow: {
    flexGrow: 1,
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
          <Button color="inherit" disableRipple>Trainee</Button>
          <Button color="inherit" disableRipple>TextField Demo</Button>
          <Button color="inherit" disableRipple>Input Demo</Button>
          <Button color="inherit" disableRipple>Children Demo</Button>
          <Button color="inherit" disableRipple>LOGOUT</Button>
        </Toolbar>
      </AppBar>
    </div>
  );
}

Navbar.propTypes = {
  classes: PropTypes.objectOf(PropTypes.string).isRequired,
};

export default withStyles(styles)(Navbar);
