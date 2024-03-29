import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import moment from 'moment';
import { Table } from '../../components';
import { AddDialog, EditDialog, RemoveDialog } from './components';
import trainees from './data/trainee';

class TraineeList extends Component {
  traineeData = {}

  removeData = null

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

  handleEditDialogOpen = (data) => {
    this.traineeData = data;
    this.setState({ edit: true });
  }

  handleRemoveDialogOpen = (data) => {
    this.removeData = data;
    this.setState({ remove: true });
  }

  handleEditClose = () => {
    this.setState({ edit: false });
    this.traineeData = {};
  }

  handleEditSubmit = (data) => {
    console.log(data);
    this.setState({ edit: false });
    this.traineeData = {};
  }

  handleRemoveClose = () => {
    this.setState({ remove: false });
  }

  handleRemoveSubmit = () => {
    console.log(this.removeData);
    this.setState({ remove: false });
    this.removeData = null;
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
        <EditDialog
          open={edit}
          onClose={this.handleEditClose}
          onSubmit={this.handleEditSubmit}
          traineeData={this.traineeData}
        />
        <RemoveDialog
          open={remove}
          onClose={this.handleRemoveClose}
          onSubmit={this.handleRemoveSubmit}
        />
      </>

    );
  }
}

TraineeList.propTypes = {
  match: PropTypes.objectOf(PropTypes.any).isRequired,
  history: PropTypes.objectOf(PropTypes.any).isRequired,
};

export default TraineeList;
