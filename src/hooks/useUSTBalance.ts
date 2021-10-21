import { LCDClient } from "@terra-money/terra.js";
import { useConnectedWallet } from "@terra-money/wallet-provider";
import { denoms } from "constants/curriencies";
import { useEffect, useState } from "react";

//can be extended to view balance of different currencies
export default function useUSTBalance(): number {
  const wallet = useConnectedWallet();
  const [balance, setBalance] = useState(0);

  useEffect(() => {
    (async () => {
      if (!wallet) {
        setBalance(0);
        return;
      }
      const client = new LCDClient({
        URL: wallet.network.lcd,
        chainID: wallet.network.chainID,
      });

      const coins = await client.bank.balance(wallet.terraAddress);
      const UUST_coin = coins.get(denoms.uusd);
      if (!UUST_coin) {
        setBalance(0);
        return;
      }
      const ustAmount = UUST_coin.amount.toNumber() / 1e6;
      setBalance(Number(ustAmount));
    })();
  }, [wallet]);

  return balance;
}
