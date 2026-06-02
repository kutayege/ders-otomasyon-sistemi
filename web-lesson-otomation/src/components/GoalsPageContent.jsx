// src/components/GoalsPageContent.jsx
import React from 'react';

function GoalsPageContent(props) {
  // props.goalsTitle, props.goalsSubtitle gibi verileri dışarıdan alıyoruz
  return (
    <div className="goals-page-content">
        <h1 className="page-title">{props.goalsTitle}</h1>
        <p className="paragraph">{props.goalsSubtitle}</p>
        {/* children, listedeki maddeleri dışarıdan alacak */}
        {props.children}
    </div>
  );
}

export default GoalsPageContent;