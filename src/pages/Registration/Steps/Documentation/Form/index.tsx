import { Link } from "react-router-dom";
import { FormValues as FV } from "../types";
import ActivityCountries from "components/ActivityCountries";
import CountrySelector from "components/CountrySelector";
import ExtLink from "components/ExtLink";
import { Selector } from "components/Selector";
import { CheckField, Field, Label } from "components/form";
import { FileDropzone, LoadText } from "components/registration";
import { APP_NAME, ENDOW_DESIGNATIONS } from "constants/common";
import { unsdgs } from "constants/unsdgs";
import { TERMS_OF_USE } from "constants/urls";
import { steps } from "../../../routes";
import { useRegState } from "../../StepGuard";
import { MB_LIMIT } from "../schema";
import { CashEligibleCheckbox } from "./CashEligibleCheckbox";
import Level from "./Level";
import { Radio } from "./Radio";
import useSubmit from "./useSubmit";

export default function Form() {
  const { data } = useRegState<2>();
  const { submit, isSubmitting } = useSubmit();

  return (
    <form className="w-full" onSubmit={submit}>
      <Level num={1} />
      <p className="mt-2 text-sm">
        {`Your organization is eligible to create its endowment. Donors can donate
        funds through your organization’s landing page on ${APP_NAME}’s
        interface. Your organization is not displayed on the marketplace and
        cannot be found through the search bar.`}
      </p>
      <Label className="mt-8 mb-2" required>
        Your personal proof of identity (This should contain a picture and be
        such as your passport or driving license. All documents are not
        published and are kept confidential)
      </Label>
      <FileDropzone<FV, "proofOfIdentity">
        name="proofOfIdentity"
        tooltip={fileTooltip}
      />
      <Field<FV>
        name="website"
        label="Website of your organization"
        required
        classes={{ container: "my-6" }}
        placeholder="e.g. https://www.example.com"
      />
      <Label className="mb-2" required>
        Proof of registration as a 501(C)(3) charity or equivalent
      </Label>
      <FileDropzone<FV, "proofOfRegistration">
        name="proofOfRegistration"
        tooltip={fileTooltip}
      />

      <Label className="mb-2 mt-6" required>
        Select the Sustainable Development Goals your organization is the most
        aligned with
      </Label>
      <Selector<FV, "sdgs", number, true>
        multiple
        name="sdgs"
        options={sdgOptions}
      />
      <Label className="mb-2 mt-6" required>
        Endowment Designation
      </Label>
      <Selector<FV, "endowDesignation", string, false>
        name="endowDesignation"
        options={ENDOW_DESIGNATIONS.map((option) => ({
          label: option.label,
          value: option.value,
        }))}
      />
      <Label className="mt-6 mb-2" required>
        Select the country your organization is headquartered in
      </Label>
      <CountrySelector<FV, "hqCountry">
        fieldName="hqCountry"
        placeholder="Select a country"
        classes={{
          container: "px-4",
          input: "text-sm py-3.5",
          error: "field-error",
        }}
      />
      <Label className="mt-6 mb-2">Active countries</Label>
      <ActivityCountries<FV, "activeInCountries"> name="activeInCountries" />

      <Separator classes="my-8" />

      <Level num={2} />
      <p className="mt-2 text-sm mb-8">
        All benefits from Level 1 + your organization will be visible in the
        marketplace.
      </p>
      <Label className="mb-2">
        At least one of the last 2 year’s financial statements
      </Label>
      <FileDropzone<FV, "financialStatements">
        multiple
        name="financialStatements"
        tooltip={fileTooltip}
      />

      <Separator classes="my-8" />

      <Level num={3} />
      <p className="mt-2 text-sm mb-8">
        3rd party audited financial report or published Annual Report
      </p>
      <Label className="mb-2">
        At least one of the last 2 year’s financial statements
      </Label>
      <FileDropzone<FV, "auditedFinancialReports">
        multiple
        name="auditedFinancialReports"
        tooltip={fileTooltip}
      />

      <Separator classes="my-8" />

      <Label>
        Only accept donations from donors who have provided their personal
        information (name and address):
      </Label>
      <div className="flex gap-4 mt-4">
        <Radio value="Yes" />
        <Radio value="No" />
      </div>
      <Separator classes="my-8" />
      <CashEligibleCheckbox />
      <CheckField<FV>
        name="hasAuthority"
        required
        classes={{
          container: "check-field-reg text-sm mb-3",
          input: "checkbox-reg self-start sm:self-center",
          error: "mt-1",
        }}
      >
        By checking this box, you declare that you have the authority to create
        an endowment in the name of {data.contact.orgName} through {APP_NAME}
      </CheckField>
      <CheckField<FV>
        name="hasAgreedToTerms"
        required
        classes={{
          container: "check-field-reg text-sm",
          input: "self-start sm:self-center",
          error: "mt-1",
        }}
      >
        By checking this box, you declare that you have read and agreed to our{" "}
        <ExtLink className="underline text-orange" href={TERMS_OF_USE}>
          Terms & Conditions
        </ExtLink>
      </CheckField>
      <div className="grid grid-cols-2 sm:flex gap-2 mt-8">
        <Link
          aria-disabled={isSubmitting}
          to={`../${steps.contact}`}
          state={data.init}
          className="py-3 min-w-[8rem] btn-outline-filled btn-reg"
        >
          Back
        </Link>
        <button
          disabled={isSubmitting}
          type="submit"
          className="py-3 min-w-[8rem] btn-orange btn-reg"
        >
          <LoadText isLoading={isSubmitting}>Continue</LoadText>
        </button>
      </div>
    </form>
  );
}

const Separator = ({ classes = "" }: { classes?: string }) => (
  <div className={`${classes} h-px w-full bg-gray-l2 dark:bg-bluegray`} />
);

const sdgOptions = Object.entries(unsdgs).map(([key, { title }]) => ({
  value: +key,
  label: `${key} - ${title}`,
}));

const fileTooltip = `Valid types are: PDF, JPG, PNG and WEBP. File should be less than ${MB_LIMIT}MB.`;
