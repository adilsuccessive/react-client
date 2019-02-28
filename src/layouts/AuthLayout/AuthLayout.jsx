import React from 'react';
import PropTypes from 'prop-types';
import { Footer } from '../components';

const AuthLayout = ({ children }) => (
  <div>
    <div className="main">{children}</div>
    <Footer />
  </div>
);

AuthLayout.propTypes = {
  children: PropTypes.node.isRequired,
};

export default AuthLayout;
