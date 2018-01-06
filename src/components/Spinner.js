import React from 'react';
import './Spinner.less';

const Spinner = (props) => {
  const className = ['spinner'];
  ['xsmall', 'small', 'medium', 'large'].forEach(size => {
    if (props[size]) className.push(size);
  });
  return (
    <div className={className.join(' ')}>
      <div className="spinner-circle1 spinner-child"></div>
      <div className="spinner-circle2 spinner-child"></div>
      <div className="spinner-circle3 spinner-child"></div>
      <div className="spinner-circle4 spinner-child"></div>
      <div className="spinner-circle5 spinner-child"></div>
      <div className="spinner-circle6 spinner-child"></div>
      <div className="spinner-circle7 spinner-child"></div>
      <div className="spinner-circle8 spinner-child"></div>
      <div className="spinner-circle9 spinner-child"></div>
      <div className="spinner-circle10 spinner-child"></div>
      <div className="spinner-circle11 spinner-child"></div>
      <div className="spinner-circle12 spinner-child"></div>
    </div>
  )
}

export default Spinner;