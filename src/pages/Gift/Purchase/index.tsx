import { useEffect } from "react";
import { useGetWallet } from "contexts/WalletContext";
import { ErrorStatus, LoadingStatus } from "components/Status";
import { useGetter, useSetter } from "store/accessors";
import { GiftState, resetDetails } from "slices/gift";
import { chainIds } from "constants/chainIds";
import { APP_NAME } from "constants/common";
import { IS_TEST } from "constants/env";
import Progress from "./Progress";
import Purchaser from "./Purchaser";
import Result from "./Result";
import Submit from "./Submit";
import { loadingKey } from "./constants";

export default function Purchase({ classes = "" }) {
  const state = useGetter((state) => state.gift);

  return (
    <div
      className={`justify-self-center grid padded-container w-full max-w-[32rem] ${classes}`}
    >
      {isHeadingShown(state) && (
        <>
          <h3 className="text-center text-3xl leading-snug">
            {`Purchase ${APP_NAME} Giftcard`}
          </h3>
          <Progress classes="my-12" />
        </>
      )}

      <CurrStep {...state} />
    </div>
  );
}

function CurrStep(props: GiftState) {
  const dispatch = useSetter();
  const { wallet, isLoading } = useGetWallet();

  /** reset form state when user disconnects, user might change wallet */
  useEffect(() => {
    !wallet && dispatch(resetDetails());
  }, [wallet, dispatch]);

  if (props.step === 2 || props.step === 1) {
    if (isLoading) {
      return (
        <LoadingStatus classes="justify-self-center">
          Loading wallet
        </LoadingStatus>
      );
    }

    if (!wallet) {
      return (
        <ErrorStatus classes="justify-self-center">
          You need to connect your wallet to make a donation
        </ErrorStatus>
      );
    }

    if (wallet.chain.chain_id !== chainIds.juno) {
      return (
        <ErrorStatus classes="justify-self-center">
          Kindly switch to Juno {IS_TEST ? "Testnet" : "Mainnet"}
        </ErrorStatus>
      );
    }

    if (props.step === 2) {
      return <Submit {...props} wallet={wallet} />;
    }

    return <Purchaser {...props} wallet={wallet} />;
  } else {
    return <Result {...props} />;
  }
}

function isHeadingShown(state: GiftState) {
  switch (state.step) {
    case 3:
      /** on tx step, only show if loading */
      return loadingKey in state.status;
    default:
      return true;
  }
}
