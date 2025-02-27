import {
  CW20Info,
  GovConfig,
  GovStaker,
  GovState,
  Poll,
} from "types/contracts";

export const staker: GovStaker = {
  balance: "0",
  share: "0",
  locked_balance: [],
};
export const poll: Poll = {
  id: 0,
  creator: "",
  status: "in_progress",
  end_height: 0,
  title: "",
  description: ".",
  link: "",
  deposit_amount: "0",
  execute_data: "",
  yes_votes: "0",
  no_votes: "0",
  staked_amount: "0",
  total_balance_at_end_poll: "0",
};
export const gov_state: GovState = {
  poll_count: 0,
  total_share: "0",
  total_deposit: "0",
};
export const gov_config: GovConfig = {
  owner: "",
  halo_token: "",
  quorum: "0",
  threshold: "0",
  voting_period: 0,
  timelock_period: 0,
  proposal_deposit: "0",
  snapshot_period: 0,
};

export const placeHolderCW20Info: CW20Info = {
  name: "",
  symbol: "",
  decimals: 6,
  total_supply: "1",
};
