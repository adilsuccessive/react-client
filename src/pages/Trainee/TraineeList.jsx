import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import Button from '@material-ui/core/Button';
import { Table } from '../../components';
import { AddDialog } from './components';
import trainees from './data/trainee';

class TraineeList extends Component {
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

  traineeList = (list) => {
    const { match } = this.props;
    return list.map(trainee => <li><Link to={`${match.path}/${trainee.id}`}>{trainee.name}</Link></li>);
  }


  render() {
    const { open } = this.state;
    return (
      <>
        <Button variant="contained" color="primary" onClick={this.handleClickOpen}>
          ADD TRAINEE
        </Button>
        <Table
          id="id"
          data={trainees}
          columns={[
            {
              field: 'name',
              label: 'Name',
              align: 'center',
            },
            {
              field: 'email',
              label: 'Email Address',
            },
          ]}
        />
        <AddDialog open={open} onClose={this.handleClose} onSubmit={this.handleSubmit} />
        <ul>
          {this.traineeList(trainees)}
        </ul>
      </>

    );
  }
}

TraineeList.propTypes = {
  match: PropTypes.objectOf(PropTypes.any).isRequired,
};

export default TraineeList;
