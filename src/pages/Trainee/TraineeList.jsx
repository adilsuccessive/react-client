import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import Button from '@material-ui/core/Button';
import moment from 'moment';
import { Table } from '../../components';
import { AddDialog } from './components';
import trainees from './data/trainee';

class TraineeList extends Component {
  state = {
    open: false,
    orderBy: '',
    order: 'asc',
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

  getDateFormatted = date => (moment(date).format('dddd MMMM Do YYYY, h:mm:ss a'))

  handleSelect = (id) => {
    const { match, history } = this.props;
    return (id ? history.push(`${match.path}/${id}`) : '');
  }

  handleSort = (field) => {
    const { order, orderBy } = this.state;
    let newOrder = 'asc';
    if (orderBy === field && order === 'asc') {
      newOrder = 'desc';
    }
    this.setState({
      orderBy: field,
      order: newOrder,
    });
  }

  render() {
    const { open, orderBy, order } = this.state;
    this.handleSelect();
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
            },
            {
              field: 'email',
              label: 'Email Address',
              format: value => value && value.toUpperCase(),
            },
            {
              field: 'createdAt',
              label: 'Date',
              align: 'right',
              format: this.getDateFormatted,
            },
          ]}
          orderBy={orderBy}
          order={order}
          onSort={this.handleSort}
          onSelect={this.handleSelect}
        />
        <AddDialog open={open} onClose={this.handleClose} onSubmit={this.handleSubmit} />
        {/* <ul>
          {this.traineeList(trainees)}
        </ul> */}
      </>

    );
  }
}

TraineeList.propTypes = {
  match: PropTypes.objectOf(PropTypes.any).isRequired,
  history: PropTypes.objectOf(PropTypes.any).isRequired,
};

export default TraineeList;
