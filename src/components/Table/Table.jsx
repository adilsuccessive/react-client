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
  renderTableHead = column => column.map(val => (
    <TableCell align={val.align}>{val.label ? val.label : val.field}</TableCell>
  ))

  renderTableBody = (rows) => {
    const { columns } = this.props;
    return rows.map(row => (
      <TableRow key={row.id}>
        {columns.map(col => (
          <TableCell align={col.align}>{row[col.field]}</TableCell>))}
      </TableRow>
    ));
  }

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
              {this.renderTableHead(columns)}
            </TableRow>
          </TableHead>
          <TableBody>
            {this.renderTableBody(data)}
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
