import { PropsWithChildren } from "react";
import QueryLoader from "components/QueryLoader";

export default function ApiKeyChecker(props: PropsWithChildren<{}>) {
  // const search = useLocation().search;
  // const apiKey = new URLSearchParams(search).get("apiKey");
  // const apiKeyQueryState = useCheckApiKey(apiKey, { skip: !apiKey });

  return (
    <QueryLoader
      queryState={{ isError: false, isLoading: false, data: {} }}
      messages={{ error: "Invalid API key" }}
      classes={{ container: "text-center mt-8" }}
    >
      {() => <>{props.children}</>}
    </QueryLoader>
  );
}
