import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';

const styles = theme => ({
  root: {
    flexGrow: 1,
    align: 'center',
    marginTop: theme.spacing.unit * 4,

  },
});

const Footer = (props) => {
  const { classes } = props;
  return (
    <div className={classes.root}>
      <div align="center"> &copy; Successive Technologies</div>
    </div>
  );
};

Footer.propTypes = {
  classes: PropTypes.objectOf(PropTypes.string).isRequired,
};

export default withStyles(styles)(Footer);
