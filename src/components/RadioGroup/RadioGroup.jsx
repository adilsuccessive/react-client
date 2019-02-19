import React from 'react';
import PropTypes from 'prop-types';
import style from './style';

const RadioGroup = (props) => {
  const { error, onChange, ...rest } = props;
  return (
    <>
    </>
  );
};
RadioGroup.defaultProps = {
  error: null,
  options: [],

};
RadioGroup.propTypes = {
  error: PropTypes.string,
  onChange: PropTypes.func.isRequired,
  value: PropTypes.string.isRequired,
  options: PropTypes.PropTypes.arrayOf(PropTypes.objectOf),
};

export default RadioGroup;
