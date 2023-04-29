import { createPortal } from "react-dom";
import { NavLink } from "react-router-dom";
import { useGetter } from "store/accessors";
import { adminRoutes, appRoutes } from "constants/routes";
import {
  adminMobileNavId,
  commonNavItemStyle,
  navLinkStyle,
} from "../constants";

export function AdminMobileNavPortal({ id }: { id: number }) {
  const isMobileNavRendered = useGetter(
    (state) => state.component.mobileNav.isRendered
  );

  return (
    (isMobileNavRendered &&
      createPortal(
        <>
          <h4 className={`${commonNavItemStyle} mb-4 uppercase font-extrabold`}>
            Admin
          </h4>
          <div className="grid justify-items-start font-heading gap-2">
            <NavLink
              end
              to={`${appRoutes.admin}/${id}`}
              className={navLinkStyle}
            >
              Dashboard
            </NavLink>
            <NavLink
              end
              to={`${appRoutes.admin}/${id}/${adminRoutes.withdraws}`}
              className={navLinkStyle}
            >
              Withdraws
            </NavLink>
            <NavLink
              end
              to={`${appRoutes.admin}/${id}/${adminRoutes.edit_profile}`}
              className={navLinkStyle}
            >
              Edit Profile
            </NavLink>
            <NavLink
              end
              to={`${appRoutes.admin}/${id}/${adminRoutes.proposals}`}
              className={navLinkStyle}
            >
              Proposals
            </NavLink>
            <NavLink
              end
              to={`${appRoutes.admin}/${id}/${adminRoutes.widget_config}/${id}`}
              className={navLinkStyle}
            >
              Create Widget
            </NavLink>
          </div>
        </>,
        document.querySelector(`#${adminMobileNavId}`)!
      )) ||
    null
  );
}
