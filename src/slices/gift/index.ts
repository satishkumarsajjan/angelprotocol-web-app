import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { TokenWithAmount } from "types/slices";

export type GiftState = FormStep | SubmitStep | TxStep;

const initialState: GiftState = { step: 1 };

const gift = createSlice({
  name: "gift",
  initialState: initialState as GiftState,
  reducers: {
    setDetails: (state, { payload }: PayloadAction<GiftDetails>) => {
      return {
        ...(state as SubmitStep),
        step: 2,
        details: payload,
      };
    },
    setTxStatus(state, { payload }: PayloadAction<TxStatus>) {
      return {
        ...(state as SubmitStep),
        step: 3,
        status: payload,
      };
    },
    resetDetails: (state) => {
      return {
        ...(state as FormStep),
        step: 1,
        details: undefined,
      };
    },

    setStep(state, { payload }: PayloadAction<number>) {
      state.step = payload as GiftState["step"];
    },
  },
});

export default gift.reducer;
export const { setStep, setDetails, resetDetails, setTxStatus } = gift.actions;

export type GiftDetails = {
  token: TokenWithAmount;
  recipient: string;

  //meta
  chainId: string;
  tokens: TokenWithAmount[];
};

export type FormStep = {
  step: 1;
  details?: GiftDetails;
};

export type SubmitStep = {
  step: 2;
} & Omit<Required<FormStep>, "step">;

export type TxResult = { hash: string };
export type GiftCard = { secret: string };
export type TLoading = { msg: string };
export type TError = { error: string; hash?: string };
export type TxStatus = TLoading | TError | TxResult | GiftCard;

export type TxStep = {
  step: 3;
  status: TxStatus;
} & Omit<SubmitStep, "step">;
