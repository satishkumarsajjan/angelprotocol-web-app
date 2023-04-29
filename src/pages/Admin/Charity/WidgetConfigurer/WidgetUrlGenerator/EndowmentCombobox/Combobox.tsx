import { Combobox as HuiCombobox } from "@headlessui/react";
import { ErrorMessage } from "@hookform/error-message";
import React, { useState } from "react";
import { Controller, useFormContext } from "react-hook-form";
import { EndowmentIdName } from "types/aws";
import { useEndowmentIdNamesQuery } from "services/aws/aws";
import { DrawerIcon } from "components/Icon";
import QueryLoader from "components/QueryLoader";
import useDebouncer from "hooks/useDebouncer";
import { unsdgs } from "constants/unsdgs";
import { FormValues } from "../../schema";

const containerStyle =
  "absolute top-full mt-2 z-10 w-full bg-white dark:bg-blue-d6 shadow-lg rounded overflow-y-scroll scroller";

export default function Combobox() {
  const {
    control,
    formState: { errors, isSubmitting, defaultValues },
  } = useFormContext<FormValues>();

  const [query, setQuery] = useState(defaultValues!.endowIdName!.name);

  const [debouncedQuery] = useDebouncer(query, 500);

  const { data, isLoading, isError } = useEndowmentIdNamesQuery({
    query: debouncedQuery || "matchall",
    sort: "default",
    endow_types: "Charity",
    tiers: "Level1,Level2,Level3",
    sdgs: Object.keys(unsdgs).join(","),
    kyc_only: "true,false",
    start: 0,
    published: "true",
  });

  return (
    <Controller
      control={control}
      name="endowIdName"
      render={({ field: { value, onChange, ref } }) => (
        <HuiCombobox
          aria-disabled={isSubmitting}
          value={value}
          onChange={onChange}
          as="div"
          className="relative items-center grid grid-cols-[1fr_auto] w-full field-container min-h-[3rem]"
        >
          <HuiCombobox.Input
            ref={ref}
            placeholder="Select an endowment..."
            onChange={(event) => setQuery(event.target.value)}
            displayValue={(value: EndowmentIdName) => value.name}
            className="pl-4"
          />

          <HuiCombobox.Button>
            {({ open }) => (
              <DrawerIcon isOpen={open} size={25} className="mx-1" />
            )}
          </HuiCombobox.Button>

          <QueryLoader
            queryState={{
              data: data?.Items,
              isLoading,
              isError,
            }}
            messages={{
              loading: "loading options..",
              error: "failed to get endowments",
              empty: debouncedQuery
                ? `${debouncedQuery} not found`
                : "no options found",
            }}
            classes={{ container: containerStyle + " p-2" }}
          >
            {(endowIdNames) => (
              <HuiCombobox.Options
                className={containerStyle}
                style={{ height: endowIdNames.length <= 10 ? "auto" : "10rem" }}
              >
                {(endowIdNames.length > 0 &&
                  endowIdNames.map((endowIdName) => (
                    <HuiCombobox.Option
                      as={React.Fragment}
                      key={endowIdName.name}
                      value={endowIdName}
                    >
                      {({ active }) => (
                        <li
                          className={`${
                            active ? "bg-blue-l2 dark:bg-blue-d1" : ""
                          } cursor-pointer flex gap-2 p-2 text-sm`}
                        >
                          <span>{endowIdName.name}</span>
                        </li>
                      )}
                    </HuiCombobox.Option>
                  ))) || (
                  <div className="p-2 text-sm">{debouncedQuery} not found</div>
                )}
              </HuiCombobox.Options>
            )}
          </QueryLoader>

          <ErrorMessage errors={errors} name="endowIdName.name" as="span" />
        </HuiCombobox>
      )}
    />
  );
}
