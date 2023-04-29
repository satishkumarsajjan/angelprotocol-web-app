import { NavLink } from "react-router-dom";
import { createNavLinkStyler } from "helpers";
import { adminRoutes } from "constants/routes";
import { useAdminResources } from "../Guard";

export default function Nav() {
  const { endowmentId } = useAdminResources();

  return (
    <div className="hidden lg:flex justify-end">
      <NavLink end to={adminRoutes.index} className={styler}>
        Dashboard
      </NavLink>
      <NavLink end to={adminRoutes.withdraws} className={styler}>
        Withdraws
      </NavLink>
      <NavLink end to={adminRoutes.edit_profile} className={styler}>
        Edit Profile
      </NavLink>
      <NavLink end to={adminRoutes.proposals} className={styler}>
        Proposals
      </NavLink>
      <NavLink
        end
        to={`${adminRoutes.widget_config}/${endowmentId}`}
        className={styler}
      >
        Create Widget
      </NavLink>
    </div>
  );
}

const styler = createNavLinkStyler(
  "px-2 uppercase text-sm text-center font-semibold font-heading",
  "text-orange-l1"
);
