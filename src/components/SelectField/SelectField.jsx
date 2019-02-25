import React from 'react';
import PropTypes from 'prop-types';
import style from './style';

const SelectField = (props) => {
  const {
    error,
    onChange,
    value,
    options,
    defaultText,
    ...rest
  } = props;
  return (
    <>
      <select {...rest} value={value} {...error} style={style.base} onChange={onChange}>
        <option value="">{defaultText}</option>
        {options.map(option => (
          <option value={option.value}>{option.value}</option>
        ))}
      </select>
    </>
  );
};
SelectField.defaultProps = {
  error: null,
  options: [],
  defaultText: 'Select',

};
SelectField.propTypes = {
  error: PropTypes.string,
  onChange: PropTypes.func.isRequired,
  value: PropTypes.string.isRequired,
  options: PropTypes.arrayOf(PropTypes.objectOf),
  defaultText: PropTypes.string,
};

export default SelectField;
