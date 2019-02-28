import React from 'react';
import PropTypes from 'prop-types';
import Typography from '@material-ui/core/Typography';
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
      <Typography variant="h2" gutterBottom>
        Not Found
      </Typography>
      <Typography component="h2" variant="display1" gutterBottom>
        Seems like the page you are looking after does not exist.
      </Typography>
    </div>
  );
};

NotFound.propTypes = {
  classes: PropTypes.objectOf(PropTypes.string).isRequired,
};

export default withStyles(styles)(NotFound);
