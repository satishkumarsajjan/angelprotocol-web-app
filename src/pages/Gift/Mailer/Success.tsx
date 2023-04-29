import { Link } from "react-router-dom";
import Icon from "components/Icon";
import { appRoutes } from "constants/routes";

export default function Success({ className = "", recipient = "" }) {
  return (
    <div
      className={`grid gap-8 justify-items-center padded-container w-full max-w-lg ${className}`}
    >
      <span className="bg-green rounded-full w-24 h-24 grid place-items-center">
        <Icon type="Check" className="text-white w-20 h-20" />
      </span>
      <h3 className="text-2xl sm:text-3xl text-center">
        Giftcard Sent Successfully
      </h3>
      <p className="-mt-4 md:font-heading md:font-semibold text-center">
        Your gift card message to {recipient} has been successfully sent.
      </p>
      <Link
        to={appRoutes.marketplace}
        className="mt-4 w-full sm:w-auto min-w-[15.6rem] btn-orange btn-gift"
      >
        Back to the platform
      </Link>
    </div>
  );
}
