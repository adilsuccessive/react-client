import React from 'react';
import propTypes from 'prop-types';
import style from './style';

const TextField = (props) => {
  const { error, onChange, ...rest } = props;
  const errors = (error) ? style.error : {};
  return (
    <>
      <input type="text" {...rest} style={{ ...style.base, ...errors, color: style.base.color }} onChange={onChange} />
      {(error) ? <p style={{ ...errors }}>{ error }</p> : ''}
    </>
  );
};
TextField.defaultProps = {
  error: null,
};
TextField.propTypes = {
  error: propTypes.string,
  value: propTypes.string.isRequired,
  onChange: propTypes.func.isRequired,
};

export default TextField;
