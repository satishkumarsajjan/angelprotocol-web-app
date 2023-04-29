import ExtLink from "components/ExtLink";
import Icon from "components/Icon";
import { WithoutInstallers } from "../WalletContext";
import { WALLET_METADATA } from "../WalletContext/constants";

export default function InstallWallet(props: {
  providerId: WithoutInstallers;
}) {
  const { installUrl, logo, name } = WALLET_METADATA[props.providerId];

  return (
    <div className="flex flex-col gap-5 w-full px-4 pt-8 pb-4">
      <ExtLink
        className="border border-blue-l1 dark:border-none dark:bg-blue-d2 hover:bg-blue rounded-2xl p-3 md:p-5 flex items-center"
        href={installUrl}
      >
        <img
          src={logo}
          alt="wallet logo"
          className="w-8 h-8 md:w-12 md:h-12 object-contain"
        />

        <div className="flex flex-col text-left ml-3 md:ml-5">
          <div className="flex items-center gap-2 dark:text-white font-bold">
            <h6 className="text-base md:text-lg">Install {name}</h6>
            <Icon type="ExternalLink" size={20} />
          </div>
          <p className="text-sm md:text-base text-gray mt-1 truncate w-40 md:w-72">
            {installUrl}
          </p>
        </div>
      </ExtLink>
      You may need to refresh the page once you have downloaded the wallet.
    </div>
  );
}
