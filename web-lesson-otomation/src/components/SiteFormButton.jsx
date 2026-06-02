// src/components/SiteFormButton.jsx
import React from 'react';

function SiteFormButton(props) {
  // İkinci butonun rengi farklı olsun diye className prop'u da alıyoruz
  const butonTasarimi = props.className || "btn-primary";
  
  return (
    <button 
      className={butonTasarimi} 
      style={{ margin: '5px' }} 
      onClick={props.onClick}
    >
      {props.label}
    </button>
  );
}

export default SiteFormButton;