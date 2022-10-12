import { CW3ConfigValues as CV } from "pages/Admin/types";
import { FormContainer, Submitter, TextInput } from "components/admin";
import usePropose from "./usePropose";

export default function Form() {
  const { configureCW3, isSubmitDisabled, isTime } = usePropose();
  return (
    <FormContainer onSubmit={configureCW3}>
      <TextInput<CV> title="Proposal Title" name="title" required />
      <TextInput<CV>
        title="proposal description"
        name="description"
        wide
        required
      />
      <TextInput<CV>
        title="pass threshold ( % )"
        name="threshold"
        required
        mono
      />
      <TextInput<CV>
        title={`voting period (${isTime ? "seconds" : "blocks"})`}
        name="duration"
        required
        mono
      />
      <Submitter type="submit" _classes="mt-4" disabled={isSubmitDisabled}>
        Submit
      </Submitter>
    </FormContainer>
  );
}
