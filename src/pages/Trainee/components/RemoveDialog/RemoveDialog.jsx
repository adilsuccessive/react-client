import React from 'react';
import PropTypes from 'prop-types';

import {
  Dialog, DialogActions, DialogContent, DialogContentText,
  DialogTitle, Button,
} from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';

const styles = theme => ({
  root: {
    flexGrow: 1,
    padding: theme.spacing.unit * 2,
  },
});

const RemoveDialog = (props) => {
  const {
    open,
    onClose,
    onSubmit,
  } = props;

  return (
    <Dialog open={open} onClose={onClose} fullWidth>
      <DialogTitle>Remove Trainee</DialogTitle>
      <DialogContent>
        <DialogContentText>Do you really want to remove the trainee?</DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button color="primary" onClick={onClose}>
            Cancel
        </Button>
        <Button
          color="primary"
          variant="contained"
          onClick={onSubmit}
        >
            Delete
        </Button>
      </DialogActions>
    </Dialog>
  );
};

RemoveDialog.propTypes = {
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
};

export default withStyles(styles)(RemoveDialog);
