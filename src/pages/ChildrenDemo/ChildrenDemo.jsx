import React from 'react';
import { Math } from '../../components';

const ChildrenDemo = () => (
  <>
    <Math first={7} second={4} operator="+" />
    <br />
    <Math first={7} second={4} operator="-" />
    <br />
    <Math first={7} second={4} operator="*" />
    <br />
    <Math first={7} second={4} operator="/" />
    <br />
    <Math first={7} second={0} operator="/" />
    <br />
    <Math first={7} second={3} operator="^" />
    <br />
    <Math first={7} second={4} operator="+">
      {({
        first, second, result,
      }) => (
        `Sum of ${first} and ${second} is ${result}`
      )}
    </Math>
    <br />
    <Math first={3} second={4} operator="+">
      {({
        first, second, result,
      }) => (
        `When we add ${first} with ${second} then we will get ${result} as result.`
      )}
    </Math>
  </>

);

export default ChildrenDemo;
