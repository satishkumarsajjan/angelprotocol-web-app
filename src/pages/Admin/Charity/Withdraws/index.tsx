import { useAdminResources } from "pages/Admin/Guard";
import { useStateQuery } from "services/juno/account";
import QueryLoader from "components/QueryLoader";
import Transactions from "./Transactions";
import WithdrawTabs from "./WithdrawTabs";

export default function Withdraws() {
  const { endowmentId } = useAdminResources();
  const queryState = useStateQuery({ id: endowmentId });

  return (
    <div className="grid content-start font-work">
      <QueryLoader
        queryState={queryState}
        messages={{
          loading: "Loading withdraw form...",
          error: "Failed to load withdraw form",
        }}
      >
        {(balance) => <WithdrawTabs {...balance} />}
      </QueryLoader>

      <h3 className="uppercase font-extrabold text-2xl mt-6 border-t border-prim pt-2">
        Transactions
      </h3>
      <Transactions />
    </div>
  );
}
