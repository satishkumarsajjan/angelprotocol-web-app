import { Airdrops } from "types/aws";
import Icon from "components/Icon";
import Modal from "components/Modal";
import { humanize } from "helpers";
import useClaimAirdrop from "./useClaimAirdrop";

export default function Catcher(props: { airdrops: Airdrops }) {
  const { claimAirdrop, totalClaimable, isSending } = useClaimAirdrop(
    props.airdrops
  );
  return (
    <Modal className="fixed-center z-20 w-full max-w-md bg-white flex flex-col rounded-md items-center p-4 shadow-lg min-h-[15rem]">
      <Icon type="Parachute" className="text-blue text-4xl" />
      <h2 className="text-blue text-2xl uppercase text-center mt-2">Airdrop</h2>
      <p className="text-blue font-heading text-2xl mt-4 mb-6">
        {humanize(totalClaimable)} HALO
      </p>

      <Action
        disabled={isSending}
        onClick={claimAirdrop(true)}
        className="text-sm"
      >
        Claim & Stake
      </Action>
      <Action
        disabled={isSending}
        onClick={claimAirdrop(false)}
        className="bg-gray-d2 font-semibold tracking-wide text-xs"
      >
        Claim
      </Action>
    </Modal>
  );
}

function Action({
  className,
  ...restProps
}: React.ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button
      {...restProps}
      className={`bg-blue text-white hover:opacity-80 disabled:bg-gray w-full py-2 rounded-md uppercase font-heading font-bold mb-2 ${className}`}
    />
  );
}
