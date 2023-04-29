import { Link } from "react-router-dom";
import ExtLink from "components/ExtLink";
import Icon from "components/Icon";
import { GiftCard, TxResult } from "slices/gift";
import { getTxUrl } from "helpers";
import { chainIds } from "constants/chainIds";
import { APP_NAME } from "constants/common";
import { appRoutes } from "constants/routes";
import { routes } from "../../routes";
import { hashKey } from "../constants";

type Props = { classes?: string } & (TxResult | GiftCard);

export default function Success(props: Props) {
  const hasRecipient = hashKey in props;

  return (
    <div className={`grid justify-items-center ${props.classes ?? ""}`}>
      <Icon type="CheckCircle" size={109.8} className="text-green mb-8" />
      <h3 className="text-2xl sm:text-3xl text-center">
        {`Thank you for purchasing ${APP_NAME} Giftcard`}
      </h3>

      {hasRecipient ? (
        <Result hash={props.hash} />
      ) : (
        <EmailCode secret={props.secret} />
      )}

      <Link
        to={appRoutes.marketplace}
        className="w-full sm:w-auto min-w-[15.6rem] btn-orange btn-gift"
      >
        Back to the platform
      </Link>
    </div>
  );
}

function Result(props: { hash: string }) {
  return (
    <>
      <p className="text-center mt-4 mb-8">
        Giftcard balance is credited to the recipient's wallet.
      </p>
      <ExtLink
        href={getTxUrl(chainIds.juno, props.hash)}
        className="btn-gift btn-outline-filled gap-3.5 w-full sm:w-auto mb-3 min-w-[15.6rem]"
      >
        <Icon type="ExternalLink" size={22} />
        <span>View transaction</span>
      </ExtLink>
    </>
  );
}
function EmailCode({ secret }: { secret: string }) {
  return (
    <>
      <p className="text-center font-heading mt-4 mb-8">
        Send the code below to your chosen recipient.
      </p>
      <div className="grid border border-prim rounded-lg overflow-clip">
        <p className="text-xs text-center uppercase text-gray-d1 dark:text-gray p-4 border-b border-prim">
          Your giftcard code:
        </p>
        <p className="bg-orange-l6 dark:bg-blue-d7 p-4 font-bold text-center text-3xl leading-relaxed break-all">
          {secret}
        </p>
      </div>
      <Link
        to={routes.mail}
        state={{ secret }}
        className="btn-outline-filled text-sm  gap-3.5 w-full sm:w-auto mb-3 mt-8 sm:mb-12 sm:mt-8 "
      >
        <Icon type="Email" size={24} />
        <span>Send gift card via email</span>
      </Link>
    </>
  );
}
