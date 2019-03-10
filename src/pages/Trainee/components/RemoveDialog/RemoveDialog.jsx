import React from 'react';
import PropTypes from 'prop-types';

import {
  Dialog, DialogActions, DialogContent, DialogContentText,
  DialogTitle, Button,
} from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import moment from 'moment';
import { SnackBarConsumer } from '../../../../contexts/SnackBarProvider/SnackBarProvider';

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
    removeData,
  } = props;
  const checkDate = '2019-02-14T00:00:00.000';
  const remove = removeData && removeData.createdAt;
  const chk = moment(checkDate).isBefore(remove);

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
        <SnackBarConsumer>
          {({ openSnackbar }) => (
            <Button
              color="primary"
              variant="contained"
              onClick={chk ? () => { openSnackbar('Trainee Deleted successfully', 'success'); onSubmit(); }
                : () => { openSnackbar('Unable to delete', 'error'); onSubmit(); }}
            >
            Delete
            </Button>
          )}
        </SnackBarConsumer>
      </DialogActions>
    </Dialog>
  );
};

RemoveDialog.propTypes = {
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
  removeData: PropTypes.objectOf(PropTypes.any).isRequired,
};

export default withStyles(styles)(RemoveDialog);
