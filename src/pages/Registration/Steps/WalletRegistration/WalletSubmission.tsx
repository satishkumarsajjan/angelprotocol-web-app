import { Link } from "react-router-dom";
import { steps } from "pages/Registration/routes";
import { WalletState, useSetWallet } from "contexts/WalletContext";
import Icon from "components/Icon";
import { LoadText, Separator } from "components/registration";
import { useRegState } from "../StepGuard";
import useRegisterWallet from "./useRegisterWallet";

export type Wallet = { address: string };

export default function WalletSubmission({
  address,
  providerId,
  walletIcon,
}: WalletState) {
  const { disconnect } = useSetWallet();
  const { isSubmitting, registerWallet } = useRegisterWallet();
  const { data } = useRegState<3>();

  if (!(providerId === "keplr" || providerId === "keplr-wc")) {
    return (
      <div className="text-center md:text-left">
        <h3 className="text-lg mb-4 flex items-center justify-center md:justify-start gap-3">
          <Icon type="Info" className="text-red" size={28} />
          <span>Unsupported wallet</span>
        </h3>
        <p className="text-gray-d1 dark:text-gray text-sm">
          connected wallet{" "}
          <span className="font-semibold capitalize">{providerId}</span> is not
          supported for registration.
        </p>

        <button
          type="button"
          className="mt-8 btn-outline-filled btn-reg"
          disabled={isSubmitting}
          onClick={disconnect}
        >
          Change wallet
        </button>
      </div>
    );
  }

  return (
    <div className="grid justify-self-center md:justify-self-start max-w-[27.31rem]">
      <h3 className="text-center md:text-left text-lg">
        You are already connected to a Wallet:
      </h3>
      <div className="grid grid-cols-[auto_1fr] items-center border border-prim p-4 rounded mt-8">
        <img
          src={walletIcon}
          alt=""
          className="w-10 h-10 object-contain row-span-2 mr-4"
        />
        <h6 className="capitalize text-lg mb-1">{providerId}</h6>
        <span className="text-sm truncate">{address}</span>
      </div>

      <Separator classes="my-8 before:mr-2 after:ml-2">OR</Separator>

      <button
        type="button"
        className="my-2 btn-outline-filled btn-reg"
        disabled={isSubmitting}
        onClick={disconnect}
      >
        Connect new wallet
      </button>
      <p className="text-center text-sm">We recommend using a new wallet.</p>

      <div className="grid grid-cols-2 md:flex mt-8 gap-2">
        <Link
          to={`../${steps.doc}`}
          state={data.init}
          aria-disabled={isSubmitting}
          className="min-w-[8rem] btn-outline-filled btn-reg"
        >
          Back
        </Link>
        <button
          type="button"
          disabled={isSubmitting}
          className="min-w-[8rem] btn-orange btn-reg"
          onClick={() => {
            registerWallet(address);
          }}
        >
          <LoadText isLoading={isSubmitting}>Continue</LoadText>
        </button>
      </div>
    </div>
  );
}
