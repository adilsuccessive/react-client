import React, { Component } from 'react';
import PropTypes from 'prop-types';

import {
  Dialog, DialogActions, DialogContent, DialogContentText,
  DialogTitle, TextField, Button, InputAdornment, Grid,
} from '@material-ui/core';
import { Person, LocalPostOffice } from '@material-ui/icons';
import { withStyles } from '@material-ui/core/styles';
import CircularProgress from '@material-ui/core/CircularProgress';
import { SnackBarConsumer } from '../../../../contexts/SnackBarProvider/SnackBarProvider';
import callApi from '../../../../lib/utils/api';

const styles = theme => ({
  root: {
    flexGrow: 1,
    padding: theme.spacing.unit * 2,
  },
  spinPosition: {
    position: 'absolute',
  },
});

class EditDialog extends Component {
    state = {
      name: '',
      email: '',
      loading: false,
      disable: true,
    };

  handleSubmit = () => {
    const {
      name,
      email,
    } = this.state;

    const { onSubmit, traineeData } = this.props;
    this.setState({
      name: (name !== '') ? name : traineeData.name,
      email: (email !== '') ? email : traineeData.email,
      loading: true,
    });
    onSubmit({
      name,
      email,
    });
  }

  handleEdit = async (openSnackbar) => {
    this.handleSubmit();
    const { traineeData } = this.props;
    const { name, email } = this.state;
    const data = { name, email, id: traineeData._id };
    const resp = await callApi(data, 'put', 'trainee');
    if (resp.data) {
      openSnackbar(`${resp.status} ${resp.data.message}`, 'success');
    } else {
      openSnackbar(`${resp}`, 'error');
    }
    this.setState({
      disable: true,
      loading: false,
    });
  };

  handleChange = field => (event) => {
    this.setState({
      [field]: event.target.value,
      disable: false,
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
    const { loading, disable } = this.state;

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
                disabled={disable}
                onClick={() => this.handleEdit(openSnackbar)}
              >
                {loading && <CircularProgress size={24} className={classes.spinPosition} />}
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
