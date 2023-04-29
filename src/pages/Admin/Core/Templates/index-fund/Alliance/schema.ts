import * as Yup from "yup";
import { AllianceEditValues } from "pages/Admin/types";
import { SchemaShape } from "schemas/types";
import { requiredWalletAddr, url } from "schemas/string";
import { proposalShape } from "../../../../constants";

const shape: SchemaShape<AllianceEditValues> = {
  ...proposalShape,
  wallet: requiredWalletAddr(),
  name: Yup.string().required("name is required"),
  logo: Yup.string()
    .nullable()
    .required("logo is required")
    .url("url is invalid"),
  website: url,
};

export const schema = Yup.object(shape);
