import React from 'react';
import Footer from '@theme-original/Footer';
import ContributorsSection from '@site/src/components/PlaybookBands/ContributorsSection';
import SupportedBySection from '@site/src/components/PlaybookBands/SupportedBySection';

// Wrap the site footer so every Playbook page ends with the Contributors and
// Supported-by bands (ported from the landing page) just above the footer.
export default function FooterWrapper(props) {
  return (
    <>
      <ContributorsSection />
      <SupportedBySection />
      <Footer {...props} />
    </>
  );
}
