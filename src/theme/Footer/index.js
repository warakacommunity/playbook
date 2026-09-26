import React from 'react';
import Footer from '@theme-original/Footer';
import SupportedBySection from '@site/src/components/PlaybookBands/SupportedBySection';

// Wrap the site footer so every Playbook page ends with the Supported-by band
// just above the footer. Contributors have their own page (/contributors).
export default function FooterWrapper(props) {
  return (
    <>
      <SupportedBySection />
      <Footer {...props} />
    </>
  );
}
