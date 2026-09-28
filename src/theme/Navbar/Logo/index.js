import React from "react";
import Link from "@docusaurus/Link";
import Logo from "@theme-original/Navbar/Logo";

// Brand lockup: [tree] AfriPlaybook. navbar.title is left unset so the
// original Logo renders only the tree mark. The Waraka link lives in the
// Community menu.
export default function LogoWrapper(props) {
  return (
    <div className="navbar-lockup">
      <Logo {...props} />
      <Link className="navbar__title navbar-lockup__title" to="/">
        AfriPlaybook
      </Link>
    </div>
  );
}
