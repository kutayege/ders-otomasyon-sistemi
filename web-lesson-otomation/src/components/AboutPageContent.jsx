// src/components/AboutPageContent.jsx
import React from 'react';

function AboutPageContent(props) {
  // props.profileTitle, props.profileSubtitle gibi verileri dışarıdan alıyoruz
  return (
    <div className="about-page-content">
        <h1 className="page-title">{props.profileTitle}</h1>
        <h3 style={{ color: '#aaa', fontWeight: 'normal' }}>{props.profileSubtitle}</h3>
        {/* children, listedeki bilgileri dışarıdan alacak */}
        {props.children}
    </div>
  );
}

export default AboutPageContent;