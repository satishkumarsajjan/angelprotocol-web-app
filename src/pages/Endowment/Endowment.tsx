import useWithdrawer from "components/Transactors/Withdrawer/useWithdrawer";
import useWalletContext from "hooks/useWalletContext";
import { useParams } from "react-router-dom";
import { useProfile } from "services/aws/endowments/queriers";
import { useEndowmentHoldings } from "services/terra/account/queriers";
import { useApprovedVaultsRate } from "services/terra/registrar/queriers";
import PageMeta from "./PageMeta";
import Liquid from "./Summary";
import TransactionList from "./TransactionList";
import { RouteParam } from "./types";

export default function Endowment() {
  const { address } = useParams<RouteParam>();
  const { wallet } = useWalletContext();
  useApprovedVaultsRate();

  //fetch exchange rate here
  const showWithdraw = useWithdrawer(address!);
  const { profile } = useProfile(address!);
  const { holdings } = useEndowmentHoldings(address!, profile.is_placeholder);
  const is_owner = profile.charity_owner === wallet?.address;

  return (
    <div className="grid grid-cols-2 gap-4 content-start padded-container justify-center">
      <PageMeta address={address!} />
      <Liquid
        type="liquid"
        holdings={holdings.liquid_cw20}
        opener={showWithdraw}
        isOwner={is_owner}
      />
      <Liquid type="locked" holdings={holdings.locked_cw20} />
      <TransactionList address={address!} />
    </div>
  );
}
