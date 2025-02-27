import { useEffect } from "react";
import { useFormContext } from "react-hook-form";
import { WithdrawValues as WV } from "./types";
import { EndowmentDetails } from "types/contracts";
import { useAdminResources } from "pages/Admin/Guard";
import { useLatestBlockQuery } from "services/juno";
import QueryLoader from "components/QueryLoader";
import { Field } from "components/form";
import { APP_NAME } from "constants/common";
import Warning from "./Warning";

export default function Submit() {
  const { endowment } = useAdminResources();
  const {
    getValues,
    formState: { isDirty, isValid, isSubmitting },
  } = useFormContext<WV>();
  const queryState = useLatestBlockQuery(null);
  const isSubmitDisabled = !isDirty || !isValid || isSubmitting;

  const type = getValues("type");
  if (type === "liquid") {
    return (
      <button
        type="submit"
        disabled={isSubmitDisabled}
        className="mt-2 btn-orange px-4 py-2 text-sm"
      >
        Create withdraw proposal
      </button>
    );
  }
  //check maturity when locked
  return (
    <QueryLoader
      queryState={queryState}
      messages={{
        loading: "Checking account maturity...",
        error: "Failed to check account maturity",
      }}
    >
      {(height) => (
        <SubmitWithReason
          endowment={endowment}
          height={+height}
          isSubmitDisabled={isSubmitDisabled}
        />
      )}
    </QueryLoader>
  );
}

type SubmitWithReasonProps = {
  isSubmitDisabled: boolean;
  endowment: EndowmentDetails;
  height: number;
};

function SubmitWithReason({
  height = 0,
  isSubmitDisabled,
  endowment,
}: SubmitWithReasonProps) {
  const { setValue } = useFormContext<WV>();

  useEffect(() => {
    //set to activate reason validation
    setValue("height", height);
  }, [height, setValue]);

  if (endowment.endow_type === "Charity") {
    return (
      <>
        <Warning classes="mb-4">
          {`Withdrawing from endowment funds requires ${APP_NAME} team approval.`}
        </Warning>
        <Field<WV>
          name="reason"
          label="Reason"
          classes={{ container: "field-admin mb-8" }}
        />
        <button
          type="submit"
          disabled={isSubmitDisabled}
          className="btn-orange px-4 py-2 text-sm"
        >
          Create withdraw proposal
        </button>
      </>
    );
  }

  //normal endowments
  const isMatured = height >= (endowment.maturity_height || 0);
  return (
    <>
      {!isMatured && (
        <Warning>
          Withdrawing endowment funds before maturity is not allowed.
        </Warning>
      )}
      <button
        type="submit"
        disabled={!isMatured}
        className="mt-2 btn-orange px-4 py-2 text-sm"
      >
        Create withdraw proposal
      </button>
    </>
  );
}
