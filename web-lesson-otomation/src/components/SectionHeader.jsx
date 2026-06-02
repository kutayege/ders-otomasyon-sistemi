// src/components/SectionHeader.jsx
import React from 'react';

function SectionHeader(props) {
  // props.emoji, props.title, props.description verilerini dışarıdan alıyoruz
  return (
    <div className="section-header" style={{ display: 'flex', gap: '10px', marginTop: '20px' }}>
      <span style={{ fontSize: '1.2em' }}>{props.emoji}</span>
      <div className="section-header-text">
        <b style={{ fontSize: '1.1em' }}>{props.title}</b>
        <p style={{ margin: '3px 0 10px 0', fontSize: '1em', color: '#aaa' }}>{props.description}</p>
      </div>
    </div>
  );
}

export default SectionHeader;