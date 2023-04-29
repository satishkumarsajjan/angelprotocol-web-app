import { useTokensQuery } from "services/apes";
import QueryLoader from "components/QueryLoader";
import { Selector } from "components/Selector";
import { FormValues } from "../schema";

export default function DenomSelector() {
  const queryState = useTokensQuery({});

  return (
    <QueryLoader
      queryState={queryState}
      messages={{
        loading: "Getting tokens...",
        error: "Failed to get tokens",
      }}
      classes={{ container: "my-2" }}
      filterFn={(token) => token.approved}
    >
      {(tokens) => (
        <Selector<FormValues, "availableCurrencies", string, true>
          name="availableCurrencies"
          options={tokens.map((token) => ({
            label: token.symbol,
            value: token.symbol,
          }))}
          classes={{ container: "bg-white dark:bg-blue-d6" }}
          allSelectable
          multiple
        />
      )}
    </QueryLoader>
  );
}
