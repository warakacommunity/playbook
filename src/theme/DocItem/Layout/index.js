import React from "react";
import Layout from "@theme-original/DocItem/Layout";
import Comments from "@site/src/components/Comments";

// The "Start Contributing Online" action now lives at the top of the right-hand
// TOC rail (see src/theme/TOC). This wrapper just keeps comments under the body.
export default function LayoutWrapper(props) {
  return (
    <>
      <Layout {...props} />
      <Comments />
    </>
  );
}
