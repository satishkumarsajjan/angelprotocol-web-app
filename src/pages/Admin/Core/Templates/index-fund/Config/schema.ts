import * as Yup from "yup";
import { FundConfigValues } from "pages/Admin/types";
import { SchemaShape } from "schemas/types";
import { positiveNumber, tokenAmountString } from "schemas/number";
import { proposalShape } from "../../../../constants";

const shape: SchemaShape<FundConfigValues> = {
  ...proposalShape,
  funding_goal: tokenAmountString,
  fund_member_limit: positiveNumber,
  fund_rotation: positiveNumber,
};

export const schema = Yup.object(shape);
