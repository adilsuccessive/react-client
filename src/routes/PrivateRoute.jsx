import React from 'react';
import PropTypes from 'prop-types';
import { Route, Redirect } from 'react-router-dom';
import { PrivateLayout } from '../layouts';

const PrivateRoute = ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render={matchProps => (
      localStorage.getItem('token')
        ? (
          <PrivateLayout>
            <Component {...matchProps} />
          </PrivateLayout>
        )
        : (
          <Redirect to="/login" />
        )
    )}
  />
);

PrivateRoute.propTypes = {
  component: PropTypes.func.isRequired,
};

export default PrivateRoute;
