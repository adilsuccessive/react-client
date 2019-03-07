import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { IconButton, Snackbar, SnackbarContent } from '@material-ui/core';
import { Close } from '@material-ui/icons';
import green from '@material-ui/core/colors/green';
import { withStyles } from '@material-ui/core/styles';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import ErrorIcon from '@material-ui/icons/Error';

const SnackBarContext = React.createContext();

const icon = {
  success: CheckCircleIcon,
  error: ErrorIcon,
};

const styles = theme => ({
  success: {
    backgroundColor: green[600],
  },
  error: {
    backgroundColor: theme.palette.error.dark,
  },
  icon: {
    fontSize: 20,
    opacity: 0.9,
    marginRight: theme.spacing.unit,
  },
  message: {
    display: 'flex',
    alignItems: 'center',
  },
});

class SnackBarProvider extends Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false,
      message: '',
      status: '',
    };
  }

  openSnackbar = (message, status) => {
    this.setState({
      message,
      status,
      open: true,
    });
  };

  closeSnackbar = () => {
    this.setState({
      open: false,
    });
  };

  render() {
    const { classes, children } = this.props;
    const { open, message, status } = this.state;
    const Icon = icon[status];
    return (
      <SnackBarContext.Provider
        value={{
          openSnackbar: this.openSnackbar,
        }}
      >
        <Snackbar
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'left',
          }}
          open={open}
          autoHideDuration={6000}
          onClose={this.closeSnackbar}
        >
          <SnackbarContent
            className={classes[status]}
            message={(
              <span className={classes.message}>
                <Icon className={classes.icon} />
                {message}
              </span>
            )}
            action={[
              <IconButton key="close" color="inherit" onClick={this.closeSnackbar}>
                <Close />
              </IconButton>,
            ]}
          />
        </Snackbar>
        {children}
      </SnackBarContext.Provider>
    );
  }
}
SnackBarProvider.propTypes = {
  classes: PropTypes.objectOf(PropTypes.object).isRequired,
  children: PropTypes.element.isRequired,
};

export const SnackBarConsumer = SnackBarContext.Consumer;
export default withStyles(styles)(SnackBarProvider);
