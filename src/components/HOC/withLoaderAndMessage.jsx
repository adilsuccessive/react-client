import React, { Component } from 'react';
import CircularProgress from '@material-ui/core/CircularProgress';

export default function withLoaderAndMessage(TableComponent) {
  return class LoaderAndMessage extends Component {
    constructor(props) {
      super(props);
      this.state = {};
    }

    render() {
      const { loading, dataLength } = this.props;
      if (loading) {
        return (
          <div style={{ marginTop: 200 }} align="center">
            <CircularProgress />
          </div>
        );
      }
      if (!loading && dataLength !== 0) {
        return (
          <>
            <TableComponent {...this.props} />
          </>
        );
      }
      return (
        <h4> Oops no trainees</h4>
      );
    }
  };
}
