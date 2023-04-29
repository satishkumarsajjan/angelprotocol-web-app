import { FormValues as FV } from "../types";
import { ContactRoles, ReferralMethods } from "types/aws";
import { Selector } from "components/Selector";
import { Field, Label } from "components/form";
import { LoadText } from "components/registration";
import { APP_NAME } from "constants/common";
import { referralOptions, roleOptions } from "../constants";
import useSubmit from "./useSubmit";

export default function Form({ classes = "" }: { classes?: string }) {
  const { submit, isSubmitting } = useSubmit();
  return (
    <form
      className={`w-full bg-white dark:bg-blue-d6 ${classes}`}
      onSubmit={submit}
    >
      <h2 className="text-center sm:text-left text-xl mb-2">
        Let's start with your contact details
      </h2>
      <p className="text-center sm:text-left text-lg mb-8">
        This information will let us know more about your organization and who
        you are. Once this form is submitted, you will be able to resume your
        registration if it gets interrupted in the future.
      </p>
      <h3 className="mb-4">Personal information</h3>
      <Field<FV>
        name="firstName"
        label="First name"
        placeholder="e.g. John"
        required
        classes={{ container: "mb-4" }}
      />
      <Field<FV>
        name="lastName"
        label="Last name"
        placeholder="e.g. Doe"
        required
        classes={{ container: "mb-4" }}
      />
      <Field<FV>
        name="phone"
        label="Phone number"
        placeholder="000000000"
        required={false}
        classes={{ container: "mb-4" }}
      />
      <Field<FV> name="email" label="E-mail address" required disabled />
      <h3 className="mt-8 mb-4">Organization information</h3>
      <Field<FV>
        name="orgName"
        label="Name of your organization"
        placeholder="Organization name"
        classes={{ container: "mb-4" }}
        required
      />
      <Label required className="mb-2">
        What's your role within the organization?
      </Label>
      <Selector<FV, "role", ContactRoles, false>
        name="role"
        options={roleOptions}
      >
        {({ value }) =>
          value === "other" && (
            <Field<FV>
              name="otherRole"
              label="Specify your role"
              required
              classes={{ container: "mt-4" }}
            />
          )
        }
      </Selector>

      <h3 className="mt-8 mb-4">Other information</h3>
      <Label required className="mb-2">
        How did you find about us?
      </Label>
      <Selector<FV, "referralMethod", ReferralMethods, false>
        name="referralMethod"
        options={referralOptions}
      >
        {({ value }) =>
          value === "other" && (
            <Field<FV>
              name="otherReferralMethod"
              label="Please provide additional information"
              required
              classes={{ container: "mt-4" }}
            />
          )
        }
      </Selector>
      <Field
        name="goals"
        label="Goals"
        placeholder={`What is your goal working with ${APP_NAME}?`}
        classes={{ container: "mt-4" }}
        required
      />
      <button
        type="submit"
        className="mt-8 py-3 px-8 w-full sm:w-auto btn-orange btn-reg"
        disabled={isSubmitting}
      >
        <LoadText isLoading={isSubmitting}>Continue</LoadText>
      </button>
    </form>
  );
}
