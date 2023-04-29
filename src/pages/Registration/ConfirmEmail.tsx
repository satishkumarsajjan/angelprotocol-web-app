import { Navigate, useLocation } from "react-router-dom";
import { InitReg } from "./types";
import { useRequestEmailMutation } from "services/aws/registration";
import { useErrorContext } from "contexts/ErrorContext";
import { useModalContext } from "contexts/ModalContext";
import Popup from "components/Popup";
import { handleMutationResult } from "helpers";

export default function ConfirmEmail({ classes = "" }: { classes?: string }) {
  /** going to this page should only be thru Signup or Resume
   *  if thru URL, would have empty state, and thus be redirected to Signup
   */
  const { state } = useLocation();
  const initReg = state as InitReg | undefined; //from non "/steps" navigations

  const [requestEmail, { isLoading }] = useRequestEmailMutation();
  const { handleError } = useErrorContext();
  const { showModal } = useModalContext();

  if (!initReg) {
    return <Navigate to={".."} />;
  }

  const openIntercom = () => (window as any).Intercom("show");

  const { email, reference } = initReg;

  return (
    <div
      className={`max-w-lg grid content-start justify-items-center ${classes}`}
    >
      <h1 className="text-[2rem] mb-2 text-center">
        Confirm your email address
      </h1>

      <p className="text-center text-gray-d1 dark:text-gray-l2 mb-8 w-full text-lg">
        We sent an email to <span className="font-semibold">{email}</span>.
        Please confirm your email by clicking on the link in the message.
      </p>
      <button
        className="w-full max-w-[26.25rem] mb-4 btn-orange btn-donate"
        onClick={async () => {
          handleMutationResult(
            await requestEmail({ uuid: reference, email }),
            handleError,
            () => {
              showModal(Popup, { message: "Email verification sent!" });
            }
          );
        }}
        disabled={isLoading}
      >
        Resend verification email
      </button>

      <button
        type="button"
        className="text-sm text-orange hover:text-orange-l2 underline decoration-1"
        onClick={openIntercom}
      >
        Having trouble receiving our emails?
      </button>
    </div>
  );
}
