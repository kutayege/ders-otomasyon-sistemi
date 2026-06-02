// src/components/AutomationHomePageContent.jsx
import React from 'react';

function AutomationHomePageContent(props) {
  // props.hintText ve props.colorfulLogo, props.mainTitle gibi verileri dışarıdan alıyoruz
  return (
    <div className="home-page-content">
        <p style={{ textAlign: 'center', color: '#ffda6a' }}>{props.hintText}</p>
        <div className="form-card" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <h2 style={{ display: 'flex', gap: '10px' }}>{props.colorfulLogo} <span style={{ color: '#4facfe' }}>{props.mainTitle}</span></h2>
            {/* children, formun içindeki girdileri dışarıdan alacak */}
            {props.children}
        </div>
    </div>
  );
}

export default AutomationHomePageContent;