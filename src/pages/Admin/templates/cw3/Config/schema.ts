import * as Yup from "yup";
import { CW3ConfigValues, FormCW3Config } from "pages/Admin/types";
import { SchemaShape } from "schemas/types";
import { requiredPositiveNumber } from "schemas/number";
import { proposalShape } from "../../../constants";

const shape: SchemaShape<CW3ConfigValues<FormCW3Config>> = {
  ...proposalShape,
  threshold: requiredPositiveNumber,
  duration: requiredPositiveNumber,
};

export const schema = Yup.object(shape);
