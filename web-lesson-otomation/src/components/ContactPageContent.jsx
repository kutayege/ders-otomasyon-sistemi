// src/components/ContactPageContent.jsx
import React from 'react';

function ContactPageContent(props) {
  // props.contactHeader, props.contactSubText gibi verileri dışarıdan alıyoruz
  return (
    <div className="contact-page-content" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <h1 style={{ display: 'flex', gap: '10px', color: '#4facfe' }}>{props.contactHeader}</h1>
        <p className="paragraph" style={{ marginBottom: '20px', color: '#aaa' }}>{props.contactSubText}</p>
        {/* children, formun içindeki girdileri dışarıdan alacak */}
        {props.children}
    </div>
  );
}

export default ContactPageContent;