import { useParams } from "react-router-dom";
import { ProposalParams } from "pages/Admin/types";
import { Expiration } from "types/contracts";
import { useProposalDetailsQuery } from "services/juno/custom";
import { useGetWallet } from "contexts/WalletContext";
import Icon from "components/Icon";
import QueryLoader from "components/QueryLoader";
import { DetailLabel, Status } from "components/admin";
import { useAdminResources } from "../Guard";
import Content from "./Content";
import PollAction from "./PollAction";
import Stats from "./Stats";
import Votes from "./Votes";

export default function Proposal() {
  const { wallet } = useGetWallet();
  const { cw3 } = useAdminResources();
  const params = useParams<ProposalParams>();
  const queryState = useProposalDetailsQuery(
    {
      id: params.id,
      cw3,
      voter: wallet?.address!,
    },
    { skip: !wallet }
  );

  return (
    <div className="grid content-start w-full min-h-screen font-work">
      <QueryLoader
        queryState={queryState}
        messages={{
          loading: "Getting proposal details",
          error: "Failed to get proposal details",
        }}
      >
        {(proposal) => (
          <div className="rounded p-4 border border-prim dark:bg-blue-d6 bg-white">
            <div className="flex justify-between flex-wrap">
              <p>ID : {proposal.id}</p>
              <Status status={proposal.status} />
            </div>
            <div className="mt-8 mb-6 flex justify-between items-center border-b-2 border-prim pb-2">
              <h4 className="text-lg">{proposal.title}</h4>
              <PollAction {...proposal} />
            </div>
            <DetailLabel>ends</DetailLabel>
            <Expiry {...proposal.expires} />
            <DetailLabel classes="mt-4">
              {proposal.proposal_type === "application"
                ? "Reason for rejection"
                : "Description"}
            </DetailLabel>
            <p className="mb-6 text-gray-d1 dark:text-gray">
              {proposal.description}
            </p>
            <Content {...proposal} />
            <h4 className="mt-6 uppercase text-lg py-2 border-b-2 border-prim">
              Votes
            </h4>
            <Stats {...proposal} />
            {proposal.votes.length > 0 && (
              <Votes proposalId={proposal.id} classes="mt-4" />
            )}
          </div>
        )}
      </QueryLoader>
    </div>
  );
}

function Expiry(props: Expiration) {
  const isTime = "at_time" in props;
  return isTime ? (
    <span className="text-sm text-gray-d1 dark:text-gray">
      {new Date(props.at_time / 1e6).toLocaleString()}
    </span>
  ) : (
    <div className="flex gap-1">
      <span className="text-sm text-gray-d1 dark:text-gray">
        {props.at_height.toLocaleString()}
      </span>
      <Icon type="Blockchain" className="relative top-1" />
    </div>
  );
}
