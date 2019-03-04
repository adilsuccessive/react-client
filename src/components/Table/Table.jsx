import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import SampleTable from '@material-ui/core/Table';
import {
  TableBody, TableCell, TableHead, TableRow, Paper,
} from '@material-ui/core';

const styles = theme => ({
  root: {
    width: '100%',
    marginTop: theme.spacing.unit * 3,
    overflowX: 'auto',
  },
  table: {
    minWidth: 700,
  },
});

class Table extends Component {
  handleTableHead = column => column.map(val => (
    <TableCell align={val.align}>{val.label ? val.label : val.field}</TableCell>
  ))

  handleTableBody = rows => rows.map(row => (
    <TableRow key={row.id}>
      <TableCell align="center">{row.name}</TableCell>
      <TableCell>{row.email}</TableCell>
    </TableRow>
  ));

  render() {
    const {
      classes,
      columns,
      data,
    } = this.props;

    return (
      <Paper className={classes.root}>
        <SampleTable className={classes.table}>
          <TableHead>
            <TableRow>
              {this.handleTableHead(columns)}
            </TableRow>
          </TableHead>
          <TableBody>
            {this.handleTableBody(data)}
          </TableBody>
        </SampleTable>
      </Paper>
    );
  }
}

Table.propTypes = {
  classes: PropTypes.objectOf(PropTypes.string).isRequired,
  columns: PropTypes.arrayOf(PropTypes.object).isRequired,
  data: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default withStyles(styles)(Table);
