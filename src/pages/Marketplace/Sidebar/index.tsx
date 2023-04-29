import Icon from "components/Icon";
import { useSetter } from "store/accessors";
import { clear, reset, toggle } from "slices/components/marketFilter";
import Designations from "./Designations";
import KYCFilter from "./KYCFilter";
import Regions from "./Regions";
import SDGGroups from "./SDGGroups";

export default function Sidebar({ classes = "" }: { classes?: string }) {
  const dispatch = useSetter();

  function toggleFilter() {
    dispatch(toggle());
  }

  return (
    <div
      className={`border border-prim dark:bg-blue-d5 dark:text-white overflow-y-auto md:overflow-hidden md:rounded-md content-start md:h-fit md:w-80 bg-gray-l5 ${classes}`}
    >
      <div className="flex justify-between p-3 items-center md:hidden bg-orange-l6 dark:bg-blue-d7 border-b border-prim">
        <h3 className="text-orange text-xl font-black uppercase">Filters</h3>
        <button onClick={toggleFilter} className="active:text-orange">
          <Icon type="Close" size={25} />
        </button>
      </div>
      <div className="bg-orange-l6 dark:bg-blue-d7 flex items-center justify-between p-4 border-b border-prim">
        <h3 className="uppercase">Filter by</h3>
        <button
          type="button"
          title="Remove all filter selections."
          onClick={() => dispatch(clear())}
          className="text-gray-d1 dark:text-gray-l2 text-sm"
        >
          Clear Filters
        </button>
        <button
          type="button"
          title="Reset all filters to their default values."
          onClick={() => dispatch(reset())}
          className="text-gray-d1 dark:text-gray-l2 text-sm"
        >
          Reset Filters
        </button>
      </div>

      <div className="flex w-full px-2">
        <div className="flex flex-col w-full">
          <Designations />
          <KYCFilter />
          <SDGGroups />
          <Regions label="Activity country" type="activities" />
          <Regions
            label="Headquarter country"
            type="headquarters"
            hideBottomBorder
          />
        </div>
      </div>
    </div>
  );
}
