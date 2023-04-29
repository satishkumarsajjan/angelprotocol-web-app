import { Link } from "react-router-dom";
import ExtLink from "components/ExtLink";
import Icon from "components/Icon";
import { useSetter } from "store/accessors";
import { TError, setStep } from "slices/gift";
import { getTxUrl } from "helpers";
import { chainIds } from "constants/chainIds";
import { appRoutes } from "constants/routes";

export default function Err({ error, hash }: TError) {
  const dispatch = useSetter();

  function goToForm() {
    dispatch(setStep(1));
  }

  return (
    <div className="grid justify-items-center">
      <div className="bg-red rounded-full aspect-square grid place-items-center mb-4 sm:mb-8">
        <Icon type="Exclamation" size={56} className="text-white m-5" />
      </div>

      <h3 className="text-2xl sm:text-3xl mb-4 text-center">
        Something went wrong!
      </h3>
      <p className="text-center mb-8">{error}</p>
      {hash && (
        <ExtLink
          href={getTxUrl(chainIds.juno, hash)}
          className="btn-gift btn-outline-filled gap-3.5 w-full sm:w-auto mb-3 min-w-[15.6rem]"
        >
          <Icon type="ExternalLink" size={22} />
          <span>View transaction</span>
        </ExtLink>
      )}
      <div className="grid sm:grid-cols-2 mt-12 gap-5 w-full sm:w-auto">
        <Link
          className="w-full btn-gift btn-outline-filled"
          to={appRoutes.marketplace}
        >
          Back to the platform
        </Link>
        <button
          type="button"
          onClick={goToForm}
          className="w-full btn-gift btn-orange"
        >
          Change payment details
        </button>
      </div>
    </div>
  );
}
