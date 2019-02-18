import React from 'react';
import { TextField } from '../../components';

const TextFieldDemo = () => (
  <div>
    <h4>This is a disabled input</h4>
    <TextField placeholder="Disabled Input" disabled />
    <h4>A Valid Input</h4>
    <TextField value="Accessible" />
    <h4>An Input with errors</h4>
    <TextField value="101" err="Could not be greater than" />
  </div>
);

export default TextFieldDemo;
