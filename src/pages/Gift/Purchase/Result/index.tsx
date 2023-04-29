import { GiftCard, TError, TxResult, TxStep } from "slices/gift";
import { errKey, loadingKey } from "../constants";
import Err from "./Err";
import Loading from "./Loading";
import Success from "./Success";

export default function Result({ ...state }: TxStep) {
  const { status } = state;
  if (errKey in status) {
    return <Err {...(status as TError)} />;
  } else if (loadingKey in status) {
    return <Loading {...status} classes="mb-4 sm:mb-40 sm:mt-20" />;
  } else {
    return <Success {...(state.status as GiftCard | TxResult)} />;
  }
}
