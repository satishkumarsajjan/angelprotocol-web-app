import { Donation } from "types/aws";
import CsvExporter from "components/CsvExporter";
import Icon from "components/Icon";
import QueryLoader from "components/QueryLoader";
import { isEmpty } from "helpers";
import Filter from "./Filter";
import MobileTable from "./MobileTable";
import NoDonations from "./NoDonations";
import Table from "./Table";
import useDonations from "./useDonations";

export default function Donations() {
  const {
    address,
    data,
    hasMore,
    isError,
    isLoading,
    isLoadingNextPage,
    query,
    loadNextPage,
    onQueryChange,
    setParams,
  } = useDonations();

  const isLoadingOrError = isLoading || isLoadingNextPage || isError;

  return (
    <div className="grid grid-cols-[1fr_auto] content-start gap-y-4 lg:gap-y-8 lg:gap-x-3 relative padded-container pt-8 lg:pt-20 pb-8">
      <h1 className="text-3xl max-lg:font-work max-lg:text-center max-lg:col-span-full max-lg:mb-4">
        My Donations
      </h1>
      <CsvExporter
        aria-disabled={isLoadingOrError || !data?.Items || isEmpty(data.Items)}
        classes="max-lg:row-start-5 max-lg:col-span-full lg:justify-self-end btn-orange px-8 py-3"
        headers={csvHeaders}
        data={data?.Items || []}
        filename="donations.csv"
      >
        Export to CSV
      </CsvExporter>
      <div className="relative flex gap-x-3 items-center border border-prim w-full bg-white dark:bg-blue-d6 rounded">
        <Icon
          type="Search"
          size={24}
          className="text-gray-d2 dark:text-gray absolute top-1/2 -translate-y-1/2 left-3"
        />
        <input
          disabled={isError}
          className="p-3 pl-10 placeholder:text-gray-d1 dark:placeholder:text-gray bg-transparent w-full outline-none disabled:bg-gray-l2 dark:disabled:bg-bluegray-d1"
          type="text"
          placeholder="Search donations..."
          value={query}
          onChange={(e) => onQueryChange(e.target.value)}
        />
      </div>
      <Filter
        isDisabled={isLoadingOrError}
        setParams={setParams}
        donorAddress={address || ""}
        classes="max-lg:col-span-full max-lg:w-full"
      />
      <QueryLoader
        queryState={{
          data: data?.Items,
          isLoading: isLoading,
          isError: isError,
        }}
        messages={{
          loading: "Loading donations..",
          error: "Failed to get donations",
          empty: <NoDonations classes="mt-8 place-self-center col-span-full" />,
        }}
      >
        {(donations) => (
          <div className="grid col-span-full">
            <Table
              donations={donations}
              classes="hidden max-lg:mt-4 lg:table"
              hasMore={hasMore}
              onLoadMore={loadNextPage}
              disabled={isLoadingOrError}
              isLoading={isLoadingNextPage}
            />
            <MobileTable
              donations={donations}
              classes="lg:hidden max-lg:my-4"
              hasMore={hasMore}
              onLoadMore={loadNextPage}
              disabled={isLoadingOrError}
              isLoading={isLoadingNextPage}
            />
          </div>
        )}
      </QueryLoader>
    </div>
  );
}

const csvHeaders: { key: keyof Donation; label: string }[] = [
  { key: "amount", label: "Amount" },
  { key: "usdValue", label: "USD Value" },
  { key: "symbol", label: "Currency" },
  { key: "date", label: "Date" },
  { key: "hash", label: "Transaction Hash" },
];
