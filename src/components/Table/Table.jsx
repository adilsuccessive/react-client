import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import SampleTable from '@material-ui/core/Table';
import {
  TableBody, TableCell, TableHead, TableRow, Paper,
  Tooltip, TableSortLabel, TablePagination, Button,
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
  const {
    orderBy,
    order,
    onSort,
    actions,
  } = this.props;
  return (
    <>
      {
        column.map(val => (
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
        ))
      }
      {actions && <TableCell />}
    </>
  );
}

  renderTableBody = (rows) => {
    const {
      columns,
      classes,
      onSelect,
      actions,
    } = this.props;
    return rows.map(row => (
      <TableRow key={row.id} hover className={classes.row}>
        {columns.map(col => (
          <TableCell align={col.align} onClick={() => onSelect(row.id)}>
            {col.format ? col.format(row[col.field]) : row[col.field]}
          </TableCell>
        ))}
        {actions && <TableCell>{actions.map(data => <Button size="small" onClick={() => data.handler(row)}>{data.icon}</Button>)}</TableCell>}
      </TableRow>
    ));
  }

  render() {
    const {
      classes,
      columns,
      data,
      count,
      page,
      rowsPerPage,
      onChangePage,
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
        <TablePagination
          rowsPerPageOptions={[10]}
          component="div"
          count={count}
          rowsPerPage={rowsPerPage}
          page={page}
          backIconButtonProps={{
            'aria-label': 'Previous Page',
          }}
          nextIconButtonProps={{
            'aria-label': 'Next Page',
          }}
          onChangePage={onChangePage}
        />
      </Paper>
    );
  }
}

Table.defaultProps = {
  onSelect: () => {},
  onSort: () => {},
  order: '',
  orderBy: '',
  actions: null,
  count: 0,
  page: 0,
  rowsPerPage: 10,
  onChangePage: () => {},
};

Table.propTypes = {
  classes: PropTypes.objectOf(PropTypes.string).isRequired,
  columns: PropTypes.arrayOf(PropTypes.object).isRequired,
  data: PropTypes.arrayOf(PropTypes.object).isRequired,
  onSelect: PropTypes.func,
  onSort: PropTypes.func,
  order: PropTypes.string,
  orderBy: PropTypes.string,
  actions: PropTypes.arrayOf(PropTypes.object),
  count: PropTypes.number,
  page: PropTypes.number,
  rowsPerPage: PropTypes.number,
  onChangePage: PropTypes.func,

};

export default withStyles(styles)(Table);
