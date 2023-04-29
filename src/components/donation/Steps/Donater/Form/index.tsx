import { useFormContext } from "react-hook-form";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { matchRoutes, useLocation } from "react-router-dom";
import { DonateValues } from "../types";
import TokenField from "components/TokenField";
import { useGetter } from "store/accessors";
import { setDetails } from "slices/donation";
import { appRoutes } from "constants/routes";
import AdvancedOptions from "./AdvancedOptions";

export default function Form(props: {
  hideAdvOpts: boolean;
  unfoldAdvOpts: boolean;
}) {
  const {
    reset,
    handleSubmit,
    getValues,
    formState: { isValid, isDirty, isSubmitting },
  } = useFormContext<DonateValues>();

  const isInsideWidget = useIsInsideWidget();

  const endowId = useGetter((state) => state.donation.recipient?.id);

  const dispatch = useDispatch();

  function submit(data: DonateValues) {
    dispatch(setDetails(data));
    reset();
  }

  const wasCompleted = !!getValues("token.amount");

  return (
    <form
      onSubmit={handleSubmit(submit)}
      className="grid rounded-md w-full"
      autoComplete="off"
    >
      <TokenField<DonateValues, "token">
        name="token"
        tokens={getValues("tokens")}
        withGiftcard
        label="Enter the donation amount:"
      />
      {!props.hideAdvOpts && (
        <AdvancedOptions classes="mt-10" unfold={props.unfoldAdvOpts} />
      )}

      <div
        className={`flex gap-3 md:gap-5 ${
          isInsideWidget ? "justify-center" : "justify-between"
        } font-body mt-8 md:mt-12`}
      >
        {!isInsideWidget && (
          <Link
            className="btn-outline-filled btn-donate w-1/2"
            to={`${appRoutes.profile}/${endowId}`}
          >
            Cancel
          </Link>
        )}
        <button
          className="btn-orange btn-donate w-1/2"
          disabled={
            !isValid || (wasCompleted ? false : !isDirty) || isSubmitting
          }
          type="submit"
        >
          Continue
        </button>
      </div>
    </form>
  );
}

function useIsInsideWidget() {
  const location = useLocation();

  const isInsideWidget = !!matchRoutes(
    [{ path: appRoutes.donate_widget + "/:id" }],
    location
  );

  return isInsideWidget;
}
