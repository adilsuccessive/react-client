import React, { Component } from 'react';
import Button from '@material-ui/core/Button';
import { AddDialog } from './components';
import { Navbar } from '../components/Navbar';

class Trainee extends Component {
  state = {
    open: false,
  };

  handleClickOpen = () => {
    this.setState({ open: true });
  };

  handleClose = () => {
    this.setState({ open: false });
  };

  handleSubmit = () => {
    this.setState({ open: false });
  }

  render() {
    const { open } = this.state;
    return (
      <>
        <Navbar />
        <Button variant="contained" color="primary" onClick={this.handleClickOpen}>
          ADD TRAINEE
        </Button>
        <AddDialog open={open} onClose={this.handleClose} onSubmit={this.handleSubmit} />
      </>
    );
  }
}

export default Trainee;
