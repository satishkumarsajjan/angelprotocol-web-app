import { Link } from "react-router-dom";
import { FormValues } from "./types";
import { Field } from "components/form";
import { Separator } from "components/registration";
import useSubmit from "./useSubmit";

export default function Form({ classes = "" }: { classes?: string }) {
  const { submit, isSubmitting } = useSubmit();
  return (
    <form
      onSubmit={submit}
      className={`${classes} grid padded-container w-full max-w-[37.5rem]`}
    >
      <h3 className="text-3xl text-center">Resume registration</h3>
      <p className="text-center mt-2 text-gray-d1 dark:text-gray-l2 text-lg">
        Enter your registration reference to resume where you left off
      </p>

      <Field<FormValues>
        name="reference"
        label="Registration reference"
        placeholder="e.g. 00000000-0000-0000-0000-000000000000"
        classes={{ container: "mt-8 mx-0 sm:mx-24" }}
      />

      <button
        type="submit"
        className="mt-8 mx-0 sm:mx-24 btn-orange btn-reg"
        disabled={isSubmitting}
      >
        Resume
      </button>
      <Separator classes="my-11 mx-0 sm:mx-24 before:mr-2 after:ml-2">
        OR
      </Separator>
      <Link
        className="mx-0 sm:mx-24 btn-outline-filled btn-reg"
        to=".."
        aria-disabled={isSubmitting}
      >
        Register new account
      </Link>
    </form>
  );
}
