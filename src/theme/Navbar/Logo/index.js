import React from "react";
import Link from "@docusaurus/Link";
import Logo from "@theme-original/Navbar/Logo";

// Brand lockup: [tree] Waraka / AfriPlaybook. The playbook is part of the
// Waraka community, so the parent name links back to waraka.org and the
// playbook name links home. navbar.title is left unset so the original Logo
// renders only the tree mark.
export default function LogoWrapper(props) {
  return (
    <div className="navbar-lockup">
      <Logo {...props} />
      <a
        className="navbar-lockup__parent"
        href="https://waraka.org"
        aria-label="Waraka Community"
      >
        Waraka
      </a>
      <span className="navbar-lockup__sep" aria-hidden="true">/</span>
      <Link className="navbar__title navbar-lockup__title" to="/">
        AfriPlaybook
      </Link>
    </div>
  );
}
