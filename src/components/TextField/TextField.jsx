import React from 'react';
import propTypes from 'prop-types';
import style from './style';

const TextField = (props) => {
  const { err, ...rest } = props;
  const error = (err) ? style.err : {};
  return (
    <>
      <input type="text" {...rest} style={{ ...style.base, ...error, color: style.base.color }} />
      {(err) ? <p style={{ ...error }}>{ err }</p> : ''}
    </>
  );
};
TextField.defaultProps = {
  err: null,
};
TextField.propTypes = {
  err: propTypes.string,
};

export default TextField;
