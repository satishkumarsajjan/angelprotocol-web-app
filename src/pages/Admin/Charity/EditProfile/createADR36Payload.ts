import { ADR36Payload } from "types/aws";
import { WalletState } from "contexts/WalletContext";
import { toBase64 } from "helpers";
import { getKeplr } from "helpers/keplr";

export async function createADR36Payload(
  data: object,
  wallet: WalletState
): Promise<ADR36Payload> {
  const keplr = getKeplr(wallet.providerId);

  const { signed, signature } = await keplr.signAmino(
    wallet.chain.chain_id,
    wallet.address,
    {
      chain_id: "",
      account_number: "0",
      sequence: "0",
      fee: {
        gas: "0",
        amount: [],
      },
      msgs: [
        {
          type: "sign/MsgSignData",
          value: {
            signer: wallet.address,
            data: toBase64(data),
          },
        },
      ],
      memo: "",
    }
  );
  const { msgs, ...rest } = signed;
  return { ...rest, msg: msgs, signatures: [signature] };
}
