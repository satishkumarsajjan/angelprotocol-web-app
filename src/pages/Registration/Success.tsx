import { Navigate, useLocation } from "react-router-dom";
import { Link } from "react-router-dom";
import { CompleteRegistration } from "./types";
import Icon from "components/Icon";
import { adminRoutes, appRoutes } from "constants/routes";

export default function Success({ classes = "" }: { classes?: string }) {
  const { state } = useLocation();
  const reg = state as CompleteRegistration | undefined;

  if (!reg || !reg.endowId) {
    return <Navigate to={".."} />;
  }

  const { contact } = reg;

  return (
    <div
      className={`${classes} grid padded-container max-w-lg justify-items-center`}
    >
      <Icon type="CheckCircle" className="text-green" size={92} />
      <h1 className="text-[2rem] mt-10 text-center">
        {contact.orgName}’s endowment has been created!
      </h1>
      <Link
        className="mt-6 text-orange hover:text-orange-l2 underline decoration-1 hover:decoration-2 text-center text-lg transition ease-in-out duration-300"
        to={`${appRoutes.admin}/${reg.endowId}/${adminRoutes.edit_profile}`}
      >
        Start filling out {contact.orgName}’s profile and attract donors!
      </Link>
    </div>
  );
}
