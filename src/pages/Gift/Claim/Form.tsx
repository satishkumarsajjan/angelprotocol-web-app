import { ErrorMessage } from "@hookform/error-message";
import { useFormContext } from "react-hook-form";
import { Link } from "react-router-dom";
import { FormValues as FV } from "./types";
import { useModalContext } from "contexts/ModalContext";
import { useGetWallet } from "contexts/WalletContext";
import Icon from "components/Icon";
import Prompt from "components/Prompt";
import { createAuthToken } from "helpers";
import { chainIds } from "constants/chainIds";
import { APP_NAME } from "constants/common";
import { appRoutes } from "constants/routes";
import { APIs } from "constants/urls";

export default function Form({ classes = "" }) {
  const {
    handleSubmit,
    register,
    reset,
    formState: { isSubmitting },
  } = useFormContext<FV>();
  const { showModal } = useModalContext();
  const { wallet } = useGetWallet();

  async function submit(data: FV) {
    const res = await fetch(APIs.aws + "/v1/giftcard/claim", {
      method: "POST",
      headers: { authorization: createAuthToken("angelprotocol-web-app") },
      body: JSON.stringify({
        secret: data.secret,
        /** restricted by submit button */
        recipient: wallet?.address,
        chain: wallet?.chain.chain_id,
      }),
    });
    if (!res.ok) {
      return showModal(Prompt, {
        type: "error",
        headline: "Claim",
        title: "Failed to claim gift card",
      });
    }
    showModal(Prompt, {
      type: "success",
      headline: "Redeem",
      title: "Giftcard Redeemed Successfully",
      children: `Giftcard balance has been credited to your account and you can start donating!`,
    });
    reset();
  }

  return (
    <form
      onSubmit={handleSubmit(submit)}
      className={`justify-self-center grid padded-container w-full max-w-[32rem] gap-8 ${classes}`}
      autoComplete="off"
    >
      <Icon
        type="Giftcard"
        className="bg-green text-white p-5 rounded-full justify-self-center"
        size={96}
      />
      <h3 className="text-center text-3xl leading-snug">
        {`Redeem ${APP_NAME} Giftcard`}
      </h3>
      <div className="relative grid w-full border border-prim rounded-lg overflow-clip">
        <p className="text-xs text-center uppercase text-gray-d1 dark:text-gray p-4 border-b border-prim">
          Type your giftcard code here:
        </p>
        <textarea
          disabled={isSubmitting}
          spellCheck={false}
          autoComplete="off"
          style={{ resize: "none" }}
          placeholder="e.g. ap-uni-6-821438429620466130011364269412975309697"
          {...register("secret")}
          className="text-lg bg-orange-l6 dark:bg-blue-d6 disabled:bg-gray-l4 disabled:dark:bg-bluegray-d1 focus:outline-none text-center p-6 pb-4 break-all overflow-hidden font-work"
        />
        <ErrorMessage
          name="secret"
          as="p"
          className="text-xs text-red dark:text-red-l2 absolute bottom-2 right-2"
        />
      </div>
      <button
        type="submit"
        className="sm:mx-32 btn-outline-filled btn-gift"
        disabled={
          isSubmitting || !wallet || wallet.chain.chain_id !== chainIds.juno
        }
      >
        {isSubmitting
          ? "Redeeming..."
          : !wallet
          ? "Connect wallet to redeem"
          : wallet.chain.chain_id !== chainIds.juno
          ? "Kindly connect Keplr wallet"
          : "Redeem your giftcard"}
      </button>
      <Link
        aria-disabled={isSubmitting}
        to={appRoutes.marketplace}
        className="sm:mx-32 btn-orange btn-gift -mt-3 sm:mt-4"
      >
        Back to the platform
      </Link>
    </form>
  );
}
