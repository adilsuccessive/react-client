import React from 'react';
import PropTypes from 'prop-types';

const RadioGroup = (props) => {
  const {
    error,
    onChange,
    value,
    options,
    ...rest
  } = props;
  return (
    <>
      {options.map(option => (
        <div key={`label${option.label}`}>
          <input type="radio" name={options} value={option.value} {...rest} onChange={onChange} />
          {option.value}
        </div>
      ))}
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
