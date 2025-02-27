import { PropsWithChildren } from "react";
import { useProfileContext } from "pages/Profile/ProfileContext";
import Icon from "components/Icon";
import { unsdgs } from "constants/unsdgs";
import EndowDesignationTag from "./EndowDesignationTag";

export default function Tags() {
  const profile = useProfileContext();

  return (
    <div className="flex flex-col items-start gap-3">
      <EndowDesignationTag />
      {profile.kyc_donors_only && (
        <Tag>
          Verification required <Icon type="Info" size={24} />
        </Tag>
      )}
      {profile.categories.sdgs.map((unsdg_num) => (
        <Tag key={unsdg_num}>
          SDG #{unsdg_num} : {unsdgs[unsdg_num].title}
        </Tag>
      ))}
    </div>
  );
}

const Tag = (props: PropsWithChildren<{}>) => (
  <div className="flex items-center gap-2 px-4 py-2 bg-blue-l4 rounded-full font-body font-semibold text-sm dark:bg-blue-d4">
    {props.children}
  </div>
);
