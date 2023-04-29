import { Link } from "react-router-dom";
import Icon from "components/Icon";
import { useSetter } from "store/accessors";
import { setStep } from "slices/donation";
import { appRoutes } from "constants/routes";

export default function Err({
  classes = "",
  endowId,
}: {
  classes?: string;
  endowId: number;
}) {
  const dispatch = useSetter();

  function goToForm() {
    dispatch(setStep(1));
  }

  return (
    <div className={`grid justify-items-center ${classes}`}>
      <div className="bg-red rounded-full aspect-square grid place-items-center mb-8">
        <Icon type="Exclamation" size={45} className="text-white m-5" />
      </div>

      <h3 className="text-2xl sm:text-3xl mb-4 sm:mb-12 text-center">
        Something went wrong!
      </h3>
      <p className="text-center">
        The payment wasn’t processed. Please double check your payment details
        or change your payment method and try again.
      </p>
      <div className="grid sm:grid-cols-2 mt-12 gap-5 w-full sm:w-auto">
        <Link
          to={appRoutes.profile + `/${endowId}`}
          className="btn-outline-filled btn-donate w-full"
        >
          Back to the platform
        </Link>
        <button
          type="button"
          onClick={goToForm}
          className="w-full btn-orange btn-donate"
        >
          Change payment details
        </button>
      </div>
    </div>
  );
}
