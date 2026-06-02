// src/components/SiteFormSelect.jsx
import React from 'react';

function SiteFormSelect(props) {
  return (
    <select 
      className="site-form-select" 
      style={{ margin: '5px' }} 
      value={props.value} 
      onChange={props.onChange}
    >
      <option value="">{props.defaultText}</option>
      {/* Dışarıdan gelen listeyi döngüye sokup seçenek (option) yaratıyoruz */}
      {props.options && props.options.map(secenek => (
        <option key={secenek} value={secenek}>{secenek}</option>
      ))}
    </select>
  );
}

export default SiteFormSelect;