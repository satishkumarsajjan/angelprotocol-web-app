import { Link } from "react-router-dom";
import { steps } from "pages/Registration/routes";
import Copier from "components/Copier";
import { APP_NAME } from "constants/common";
import { useRegState } from "../StepGuard";

export default function RegisteredWallet(props: {
  onChange: () => void;
  address: string;
}) {
  const { data } = useRegState<3>();
  return (
    <div className="grid">
      <h3 className="text-lg">You Wallet is registered!</h3>
      <p className="text-gray-d1 dark:text-gray text-sm mt-2">
        {`Once you have registered your wallet address, we shall be able to create
        your ${APP_NAME} endowment account. You can change your wallet at any
        time.`}
      </p>

      <div className="grid mt-8 border border-prim p-8 rounded">
        {/** TODO: only address:string is saved in DB, can't determine what wallet corresponds to that address
         *  should also save: { name, logo }
         */}
        <p className="text-sm mb-2">Your Wallet address:</p>
        <p className="relative px-4 py-3 border border-prim rounded flex items-center text-sm truncate">
          <span className="truncate pr-6">{props.address}</span>
          <Copier
            text={props.address}
            classes="text-inherit absolute right-3 top-1/2 transform -translate-y-1/2"
            size={{ copy: 26, check: 20 }}
          />
        </p>
        <button
          type="button"
          onClick={props.onChange}
          className="mt-6 btn-outline-filled btn-reg"
        >
          change wallet
        </button>
      </div>

      <div className="grid grid-cols-2 md:flex gap-3 items-center mt-8">
        <Link
          to={`../${steps.doc}`}
          state={data.init}
          className="min-w-[8rem] btn-outline-filled btn-reg"
        >
          Back
        </Link>
        <Link
          to={`../${steps.summary}`}
          state={data.init}
          className="min-w-[8rem] btn-orange btn-reg"
        >
          Continue
        </Link>
      </div>
    </div>
  );
}
