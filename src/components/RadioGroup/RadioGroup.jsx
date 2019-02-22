import React from 'react';
import PropTypes from 'prop-types';
import style from './style';

const RadioGroup = (props) => {
  const {
    error,
    onChange,
    value,
    options,
    ...rest
  } = props;
  const errors = (error) ? style.error : {};
  return (
    <>
      {options.map(option => (
        <div key={`label${option.label}`}>
          <input type="radio" name={options} value={option.value} style={{ ...style.base, ...errors, color: style.base.color }} {...rest} onChange={onChange} />
          {option.value}
        </div>
      ))}
      {(error) ? <p style={{ ...errors }}>{ error }</p> : ''}
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
