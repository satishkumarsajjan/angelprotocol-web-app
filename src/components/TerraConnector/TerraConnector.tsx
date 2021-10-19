import Wallet from "components/Wallet/Wallet";
import useTerraConnector from "./useTerraConnector";

export default function TerraConnector() {
  const {
    status,
    WalletStatus,
    isInstallable,
    isConnectible,
    handleConnect,
    handleInstall,
  } = useTerraConnector();

  switch (status) {
    case WalletStatus.INITIALIZING:
      return (
        <div>
          <button className={`cursor-wait text-white`} disabled>
            Initializing Wallet...
          </button>
        </div>
      );
    case WalletStatus.WALLET_NOT_CONNECTED:
      return (
        <div>
          {isConnectible && (
            <button
              className="uppercase hover:bg-opacity-90 bg-grey-accent rounded-xl w-40 h-8 d-flex justify-center items-center text-sm text-white font-bold"
              onClick={handleConnect}
            >
              Connect Wallet
            </button>
          )}
          {isInstallable && (
            <button
              className="uppercase hover:bg-opacity-90 bg-leaf-green rounded-xl w-40 h-8 d-flex justify-center items-center text-sm text-white font-bold"
              onClick={handleInstall}
            >
              Install Wallet
            </button>
          )}
        </div>
      );
    case WalletStatus.WALLET_CONNECTED:
      return <Wallet />;
  }
}
