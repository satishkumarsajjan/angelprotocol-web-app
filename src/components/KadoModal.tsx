import { useCallback } from "react";
import { invalidateApesTags } from "services/apes";
import { useModalContext } from "contexts/ModalContext";
import { useGetWallet } from "contexts/WalletContext";
import Icon from "components/Icon";
import { useSetter } from "store/accessors";
import { logger } from "helpers";
import { chainIDs } from "constants/chains";
import { KADO_API_KEY } from "constants/env";
import IFrame from "./IFrame";
import Modal from "./Modal";

type KADO_NETWORK_VALUES = "ethereum" | "juno" | "terra";

export default function KadoModal() {
  const dispatch = useSetter();
  const { closeModal, setModalOption } = useModalContext();

  const { wallet } = useGetWallet();

  const handleOnLoad = useCallback(
    () =>
      // there is a high chance the user bought some new crypto prior to closing this modal
      // reload the page to get new wallet balances
      setModalOption("onClose", () => dispatch(invalidateApesTags(["chain"]))),
    [setModalOption, dispatch]
  );

  const onToAddress = !wallet ? "" : `&onToAddress=${wallet.address}`;
  const network = !wallet
    ? ""
    : `&network=${getKadoNetworkValue(wallet.chain.chain_id)}`;

  return (
    <Modal className="fixed inset-0 sm:fixed-center z-10 flex flex-col sm:w-[500px] sm:h-[700px] bg-gray-l5 dark:bg-blue-d6 sm:border border-prim sm:rounded">
      <Modal.Title
        as="h3"
        className="relative w-full pl-4 px-4 sm:px-0 py-4 sm:py-6 bg-orange-l6 border-b border-prim rounded-t font-black sm:font-bold sm:text-center text-xl text-orange sm:text-gray-d2 dark:text-white uppercase sm:normal-case dark:bg-blue-d7 "
      >
        Buy with Kado
        <button
          className="absolute right-1 top-1/2 -translate-y-1/2 flex items-center justify-center w-10 h-10 mr-4 sm:border border-prim hover:border-gray sm:rounded  dark:hover:border-bluegray-d1 text-gray-d2 hover:text-black dark:text-white dark:hover:text-gray"
          onClick={closeModal}
        >
          <Icon type="Close" className="w-8 sm:w-7 h-8 sm:h-7" />
        </button>
      </Modal.Title>
      <IFrame
        src={`https://app.kado.money?apiKey=${KADO_API_KEY}&onPayCurrency=USD&onRevCurrency=USDC&onPayAmount=100${onToAddress}&cryptoList=USDC${network}&product=BUY&networkList=ethereum,juno,terra`}
        className="w-full h-full border-none rounded-b"
        title="Buy with Kado"
        onLoad={handleOnLoad}
      />
    </Modal>
  );
}

function getKadoNetworkValue(chainId: string): KADO_NETWORK_VALUES {
  switch (chainId) {
    // if Binance, just default to ethereum
    case chainIDs.binanceMain:
    case chainIDs.binanceTest:
    case chainIDs.ethMain:
    case chainIDs.ethTest:
      return "ethereum";
    case chainIDs.junoMain:
    case chainIDs.junoTest:
      return "juno";
    case chainIDs.terraMain:
    case chainIDs.terraTest:
      return "terra";
    default:
      logger.error(`${chainId} is not supported`);
      return "ethereum";
  }
}
