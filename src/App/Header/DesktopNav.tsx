import { NavLink } from "react-router-dom";
import { createNavLinkStyler } from "helpers";
import { BASE_DOMAIN } from "constants/common";
import { appRoutes } from "constants/routes";

export default function DesktopNav({ classes = "" }: { classes?: string }) {
  return (
    <nav className={`${classes} items-center justify-end font-body text-base`}>
      <a href={BASE_DOMAIN} className={styles}>
        For Non-Profits
      </a>
      <NavLink className={styler} to={appRoutes.index}>
        Marketplace
      </NavLink>
      <a href={`${BASE_DOMAIN}/giving-partners-csr/`} className={styles}>
        Giving Partners
      </a>
      <a href={`${BASE_DOMAIN}/about-angel-giving/`} className={styles}>
        About
      </a>
      <NavLink className={styler} to={appRoutes.register}>
        Register
      </NavLink>
    </nav>
  );
}

const styles =
  "px-4 text-sm text-white hover:text-orange-l1 active:text-orange transition ease-in-out duration-300 uppercase font-heading font-bold";
const styler = createNavLinkStyler(styles, "pointer-events-none text-orange");
