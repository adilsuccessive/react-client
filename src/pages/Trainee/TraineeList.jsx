import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import Button from '@material-ui/core/Button';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import moment from 'moment';
import { Table } from '../../components';
import { AddDialog, EditDialog, RemoveDialog } from './components';
import trainees from './data/trainee';

class TraineeList extends Component {
  state = {
    open: false,
    edit: false,
    remove: false,
    orderBy: '',
    order: 'asc',
    page: 0,
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

  handleChangePage = (event, page) => {
    this.setState({ page });
  }

  handleEditDialogOpen = () => {
    this.setState({ edit: true });
  }

  handleRemoveDialogOpen = () => {
    this.setState({ remove: true });
  }

  handleEditClose = () => {
    this.setState({ edit: false });
  }

  handleEditSubmit = (data) => {
    console.log(data);
    this.setState({ edit: false });
  }

  handleRemoveClose = () => {
    this.setState({ remove: false });
  }

  handleRemoveSubmit = (data) => {
    console.log(data);
    this.setState({ remove: false });
  }

  render() {
    const {
      open,
      edit,
      remove,
      orderBy,
      order,
      page,
    } = this.state;
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
          actions={[
            {
              icon: <EditIcon />,
              handler: this.handleEditDialogOpen,
            },
            {
              icon: <DeleteIcon />,
              handler: this.handleRemoveDialogOpen,
            },
          ]}
          orderBy={orderBy}
          order={order}
          onSort={this.handleSort}
          onSelect={this.handleSelect}
          count={100}
          page={page}
          onChangePage={this.handleChangePage}
        />
        <AddDialog open={open} onClose={this.handleClose} onSubmit={this.handleSubmit} />
        <EditDialog open={edit} onClose={this.handleEditClose} onSubmit={this.handleEditSubmit} />
        <RemoveDialog open={remove} onClose={this.handleRemoveClose} onSubmit={this.handleRemoveSubmit} />
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
