import { BtnLink, BtnLinkProps } from "components/BtnLink";

export function BtnOutline({ className = "", ...props }: BtnLinkProps) {
  return (
    <BtnLink
      {...props}
      className={`${className} text-sm uppercase p-3 rounded border border-gray-l2 dark:border-bluegray text-center enabled:hover:border-gray-l1 enabled:hover:dark:border-blue-d2 font-bold font-body`}
    />
  );
}
