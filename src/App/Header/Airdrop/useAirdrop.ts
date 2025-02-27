import { useCallback } from "react";
import { Airdrops } from "types/aws";
import { useModalContext } from "contexts/ModalContext";
import Catcher from "./Catcher";

export default function useAirdrop() {
  const { showModal } = useModalContext();
  const airdrops: Airdrops = []; //FUTURE: reenable when multicall for terra v2.0 is available

  const showDetails = useCallback(() => {
    showModal(Catcher, { airdrops });
    //eslint-disable-next-line
  }, [airdrops]);

  return { airdrop_shown: airdrops.length > 0, showDetails };
}
