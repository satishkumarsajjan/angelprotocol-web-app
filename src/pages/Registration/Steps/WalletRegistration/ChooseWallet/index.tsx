import { Link } from "react-router-dom";
import { steps } from "../../../routes";
import { useRegState } from "../../StepGuard";
import KeplrConnector from "./KeplrConnector";

export default function ChooseWallet() {
  const { data } = useRegState<3>();
  return (
    <div className="w-full grid">
      <h3 className="text-lg">Choose a wallet</h3>
      <p className="mb-8 text-sm text-gray-d1 dark:text-gray mt-2">
        We recommend using a new wallet.
      </p>
      <KeplrConnector />
      <Link
        to={`../${steps.doc}`}
        state={data.init}
        className="mt-8 max-w-[8rem] btn btn-outline-filled btn-reg"
      >
        Back
      </Link>
    </div>
  );
}
