import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';

const styles = theme => ({
  root: {
    marginTop: theme.spacing.unit * 5,
    fontSize: 25,
  },
});

const NotFound = (props) => {
  const { classes } = props;
  return (
    <div className={classes.root} align="center">
      <h1>Not Found</h1>
      <p>Seems like the page you are looking after does not exist.</p>
    </div>
  );
};

NotFound.propTypes = {
  classes: PropTypes.objectOf(PropTypes.string).isRequired,
};

export default withStyles(styles)(NotFound);
