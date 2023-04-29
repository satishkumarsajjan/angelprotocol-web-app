import { Navigate } from "react-router-dom";
import { CompleteRegistration } from "pages/Registration/types";
import routes from "pages/Registration/routes";
import { useSubmitMutation } from "services/aws/registration";
import { useErrorContext } from "contexts/ErrorContext";
import { useModalContext } from "contexts/ModalContext";
import Prompt from "components/Prompt";
import { handleMutationResult } from "helpers";
import { chainIds } from "constants/chainIds";
import { useRegState, withStepGuard } from "../StepGuard";
import EndowmentStatus from "./EndowmentStatus";
import Step from "./Step";

function Dashboard() {
  const { data } = useRegState<4>();

  const [submitApplication, { isLoading: isSubmitting }] = useSubmitMutation();
  const { showModal } = useModalContext();
  const { handleError } = useErrorContext();

  const submit = async ({ init }: CompleteRegistration) => {
    handleMutationResult(
      await submitApplication({
        ref: init.reference,
        chain_id: chainIds.juno,
      }),
      handleError,
      () => {
        showModal(Prompt, {
          type: "success",
          headline: "Submission",
          title: "Submitted for review",
          children: <>Your application has been submitted</>,
        });
      }
    );
  };

  const { documentation, status } = data;
  const isStepDisabled = isSubmitting || status === "Under Review";

  if (status === "Active") {
    return <Navigate to={`../../${routes.success}`} state={data} />;
  }

  return (
    <div className="grid">
      <h3 className="text-lg mb-2">Summary</h3>
      <p className="text-sm mb-8">
        {status === "Inactive" && //keep bottom margin
          "Please confirm that each step has been correctly completed so that your organization can be properly registered."}
      </p>

      <Step num={1} disabled={isStepDisabled} />
      <Step
        num={2}
        disabled={isStepDisabled}
        status={`Level ${documentation.level}`}
      />
      <Step num={3} disabled={isStepDisabled} />

      <EndowmentStatus
        isSubmitting={isSubmitting}
        onSubmit={() => submit(data)}
        status={status}
        endowId={data.endowId}
        classes="mt-6"
      />
    </div>
  );
}

export default withStepGuard(Dashboard);
