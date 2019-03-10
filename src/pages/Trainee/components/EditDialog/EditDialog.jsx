import React, { Component } from 'react';
import PropTypes from 'prop-types';

import {
  Dialog, DialogActions, DialogContent, DialogContentText,
  DialogTitle, TextField, Button, InputAdornment, Grid,
} from '@material-ui/core';
import { Person, LocalPostOffice } from '@material-ui/icons';
import { withStyles } from '@material-ui/core/styles';
import { SnackBarConsumer } from '../../../../contexts/SnackBarProvider/SnackBarProvider';

const styles = theme => ({
  root: {
    flexGrow: 1,
    padding: theme.spacing.unit * 2,
  },
});

class EditDialog extends Component {
    state = {
      name: '',
      email: '',
    };

  handleSubmit = () => {
    const {
      name,
      email,
    } = this.state;

    const { onSubmit, traineeData } = this.props;
    onSubmit({
      name: (name !== '') ? name : traineeData.name,
      email: (email !== '') ? email : traineeData.email,
    });
    this.setState({
      name: '',
      email: '',
    });
  }

  handleChange = field => (event) => {
    this.setState({
      [field]: event.target.value,
    });
  }

  renderTextField = (label, value, name, icon, type) => (
    <TextField
      label={label}
      defaultValue={value}
      name={name}
      type={type}
      onChange={this.handleChange(name)}
      fullWidth
      margin="normal"
      variant="outlined"
      InputProps={{
        startAdornment: (
          <InputAdornment position="start">
            {icon}
          </InputAdornment>
        ),
      }}
    />
  )

  render() {
    const {
      open,
      onClose,
      classes,
      traineeData,
    } = this.props;

    return (
      <Dialog open={open} onClose={onClose} fullWidth>
        <DialogTitle>Edit Trainee</DialogTitle>
        <DialogContent>
          <DialogContentText>Enter your trainee details</DialogContentText>
          <div className={classes.root}>
            <Grid container spacing={24}>
              <Grid item xs={12}>
                {this.renderTextField(
                  'Name',
                  traineeData.name,
                  'name',
                  <Person />,
                  'text',
                )}
              </Grid>
              <Grid item xs={12}>
                {this.renderTextField(
                  'Email Address',
                  traineeData.email,
                  'email',
                  <LocalPostOffice />,
                  'text',
                )}
              </Grid>
            </Grid>
          </div>
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
                onClick={() => { openSnackbar('Trainee Edited successfully', 'success'); this.handleSubmit(); }}
              >
                Submit
              </Button>
            )}
          </SnackBarConsumer>
        </DialogActions>
      </Dialog>
    );
  }
}

EditDialog.propTypes = {
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
  classes: PropTypes.objectOf(PropTypes.string).isRequired,
  traineeData: PropTypes.objectOf(PropTypes.any).isRequired,
};

export default withStyles(styles)(EditDialog);
