import React, { useEffect } from 'react';

// Landing page for the GitHub OAuth popup. GitHub redirects the popup here with
// ?code=…; we hand the code back to the window that opened it and close.
// (The code → token exchange happens on the proxy worker, not here.)
export default function OAuthCallback() {
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    if (window.opener) {
      window.opener.postMessage(
        {
          type: 'github-oauth-callback',
          code: params.get('code'),
          error: params.get('error'),
          errorDesc: params.get('error_description'),
        },
        window.location.origin,
      );
    }
    window.close();
  }, []);

  return (
    <main style={{ fontFamily: 'system-ui, sans-serif', padding: '2rem', textAlign: 'center' }}>
      Completing GitHub sign-in… you can close this window.
    </main>
  );
}
