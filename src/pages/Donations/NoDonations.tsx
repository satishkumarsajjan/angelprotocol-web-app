import not_found from "assets/images/not-found.png";

export default function NoDonations({ classes = "" }) {
  return (
    <div
      className={`${classes} max-sm:text-center grid sm:grid-cols-[1fr_auto] font-work max-w-md gap-y-2 gap-x-4`}
    >
      <img
        alt="someone looking for an object"
        src={not_found}
        className="max-sm:place-self-center sm:col-start-2 sm:row-start-1 sm:row-span-2 rounded-full w-48 object-cover object-center"
      />
      <h3 className="text-lg self-end">No donations found.</h3>
      <p className="self-start text-gray-d1 dark:text-gray">
        Sorry! We coudn't find any donations. Try connecting a different wallet
        ( or adjust any filters applied ).
      </p>
    </div>
  );
}
