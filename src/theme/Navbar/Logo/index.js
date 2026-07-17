import React from "react";
import Link from "@docusaurus/Link";
import useBaseUrl from "@docusaurus/useBaseUrl";
import useDocusaurusContext from "@docusaurus/useDocusaurusContext";
import { useThemeConfig } from "@docusaurus/theme-common";
import { useLocation } from "@docusaurus/router";
import ThemedImage from "@theme/ThemedImage";

// Swizzled navbar brand. Identical to the stock @theme/Logo, except the
// title text follows the current section: on the AfriAnnotate docs
// (second docs instance under /annotate) the brand reads "Annotate"
// instead of "Playbook" — mirroring how the playbook brand says
// "Playbook" (not "AfriPlaybook"). Same logo image throughout.
//
// useLocation() is resolved per-page at SSR, so each statically generated
// page ships the correct brand text with no hydration flash.

// Brand text shown while browsing the AfriAnnotate docs instance.
const ANNOTATE_TITLE = "Annotate";

function isAnnotatePath(pathname) {
  return /\/annotate(\/|$)/.test(pathname || "");
}

function LogoThemedImage({ logo, alt, imageClassName }) {
  const sources = {
    light: useBaseUrl(logo.src),
    dark: useBaseUrl(logo.srcDark || logo.src),
  };
  const themedImage = (
    <ThemedImage
      className={logo.className}
      sources={sources}
      height={logo.height}
      width={logo.width}
      alt={alt}
      style={logo.style}
    />
  );
  return imageClassName ? (
    <div className={imageClassName}>{themedImage}</div>
  ) : (
    themedImage
  );
}

export default function NavbarLogo() {
  const {
    siteConfig: { title },
  } = useDocusaurusContext();
  const {
    navbar: { title: navbarTitle, logo },
  } = useThemeConfig();
  const { pathname } = useLocation();

  const imageClassName = "navbar__logo";
  const titleClassName = "navbar__title text--truncate";

  const brandTitle = isAnnotatePath(pathname) ? ANNOTATE_TITLE : navbarTitle;

  const logoLink = useBaseUrl(logo?.href || "/");
  const fallbackAlt = brandTitle ? "" : title;
  const alt = logo?.alt ?? fallbackAlt;

  return (
    <Link
      to={logoLink}
      className="navbar__brand"
      {...(logo?.target && { target: logo.target })}
    >
      {logo && (
        <LogoThemedImage
          logo={logo}
          alt={alt}
          imageClassName={imageClassName}
        />
      )}
      {brandTitle != null && <b className={titleClassName}>{brandTitle}</b>}
    </Link>
  );
}
