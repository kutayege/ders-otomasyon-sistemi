// src/components/PageContainer.jsx
import React from 'react';

function PageContainer(props) {
  // props.children, HTML etiketleri arasına yazılan her şeyi dışarıdan alır
  return <div className="page-container">{props.children}</div>;
}

export default PageContainer;