import React, { Component } from 'react';
import PropTypes from 'prop-types';

import {
  Dialog, DialogActions, DialogContent, DialogContentText,
  DialogTitle, TextField, Button, InputAdornment, Grid,
} from '@material-ui/core';
import { Person, LocalPostOffice } from '@material-ui/icons';
import { withStyles } from '@material-ui/core/styles';

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

    const { onSubmit } = this.props;
    onSubmit({
      name,
      email,
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
      value={value}
      name={name}
      defaultValue="name"
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
    } = this.props;

    const {
      email,
      name,
    } = this.state;

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
                  name,
                  'name',
                  <Person />,
                  'text',
                )}
              </Grid>
              <Grid item xs={12}>
                {this.renderTextField(
                  'Email Address',
                  email,
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
          <Button
            color="primary"
            variant="contained"
            onClick={this.handleSubmit}

          >
            Submit
          </Button>
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
};

export default withStyles(styles)(EditDialog);
