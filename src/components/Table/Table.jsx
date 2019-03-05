import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import SampleTable from '@material-ui/core/Table';
import {
  TableBody, TableCell, TableHead, TableRow, Paper,
  Tooltip, TableSortLabel,
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
  row: {
    '&:nth-of-type(odd)': {
      backgroundColor: theme.palette.background.default,
    },
    cursor: 'pointer',
  },
});

class Table extends Component {
renderTableHead = (column) => {
  const { orderBy, order, onSort } = this.props;
  return column.map(val => (
    <TableCell align={val.align} sortDirection={orderBy === val.field ? order : false}>
      <Tooltip
        title=""
        placement="bottom-start"
        enterDelay={300}
      >
        <TableSortLabel
          active={orderBy === val.field}
          direction={order}
          onClick={() => onSort(val.field)}
        >
          {val.label ? val.label : val.field}
        </TableSortLabel>
      </Tooltip>
    </TableCell>
  ));
}

  renderTableBody = (rows) => {
    const { columns, classes, onSelect } = this.props;
    return rows.map(row => (
      <TableRow key={row.id} hover onClick={() => onSelect(row.id)} className={classes.row}>
        {columns.map(col => (
          <TableCell align={col.align}>
            {col.format ? col.format(row[col.field]) : row[col.field]}
          </TableCell>
        ))}
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

Table.defaultProps = {
  onSelect: () => {},
  onSort: () => {},
  order: '',
  orderBy: '',
};

Table.propTypes = {
  classes: PropTypes.objectOf(PropTypes.string).isRequired,
  columns: PropTypes.arrayOf(PropTypes.object).isRequired,
  data: PropTypes.arrayOf(PropTypes.object).isRequired,
  onSelect: PropTypes.func,
  onSort: PropTypes.func,
  order: PropTypes.string,
  orderBy: PropTypes.string,
};

export default withStyles(styles)(Table);
