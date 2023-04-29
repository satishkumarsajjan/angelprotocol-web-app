import { BtnLink, BtnLinkProps } from "components/BtnLink";

export function BtnSec({ className = "", ...props }: BtnLinkProps) {
  return (
    <BtnLink
      {...props}
      className={`${className} text-sm p-3 uppercase rounded border border-gray-l2 dark:border-bluegray enabled:hover:border-gray-l1 enabled:hover:dark:border-blue-d2 font-bold font-body bg-orange-l5 dark:bg-blue-d4 disabled:bg-gray-l2 disabled:dark:bg-bluegray disabled:cursor-auto aria-disabled:pointer-events-none aria-disabled:bg-gray-l2 aria-disabled:dark:bg-bluegray-d1 text-center hover:bg-orange-l4 dark:hover:bg-blue-d3`}
    />
  );
}
