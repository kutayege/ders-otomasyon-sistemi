// src/components/SiteFormInput.jsx
import React from 'react';

function SiteFormInput(props) {
  return (
    <input 
      type="text" 
      placeholder={props.placeholder} 
      className="input-box" 
      style={{ margin: '5px' }} 
      value={props.value}
      onChange={props.onChange}
    />
  );
}

export default SiteFormInput;