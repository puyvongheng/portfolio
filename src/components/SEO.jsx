import React from 'react';
import { Helmet } from 'react-helmet-async';

const SEO = ({ title, description, type = 'website' }) => {
  const defaultTitle = "Puyvong Heng | Portfolio";
  const defaultDesc = "Full-Stack Developer & Designer passionate about technology and computer science.";
  
  return (
    <Helmet>
      <title>{title ? `${title} - Puyvong Heng` : defaultTitle}</title>
      <meta name="description" content={description || defaultDesc} />
      <meta property="og:type" content={type} />
      <meta property="og:title" content={title || defaultTitle} />
      <meta property="og:description" content={description || defaultDesc} />
    </Helmet>
  );
};

export default SEO;
