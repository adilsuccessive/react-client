import React from 'react';
import PropTypes from 'prop-types';
import Style from './style';

const Button = (props) => {
  const {
    color,
    disabled,
    style,
    value,
    onClick,
    ...rest
  } = props;
  const btnStyle = (color === 'default' || !Style[color] || disabled)
    ? {}
    : Style[color];

  return (
    <>
      <input
        type="button"
        {...rest}
        value={value}
        disabled={disabled}
        style={{ ...Style.base, ...btnStyle, ...style }}
      />
    </>
  );
};
Button.propTypes = {
  color: PropTypes.oneOf(['default', 'primary']),
  disabled: PropTypes.bool,
  style: PropTypes.objectOf(PropTypes.string),
  value: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,

};
Button.defaultProps = {
  color: 'default',
  disabled: false,
  style: {},
};

export default Button;
