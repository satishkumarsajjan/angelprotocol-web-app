import { EndowmentBookmark } from "types/aws";
import Image from "components/Image";
import Links from "./Links";

type Props = { endowments: EndowmentBookmark[] };

export default function MyEndowments({ endowments }: Props) {
  return (
    <div className="grid p-4 gap-3 border-b border-prim">
      <h3 className="text-sm text-gray-d1 dark:text-gray">My Endowments</h3>
      <div className="overflow-y-auto max-h-40 scroller grid gap-3">
        {endowments.map((endowment) => (
          <div
            key={`my-endow-${endowment.endowId}`}
            className="grid grid-cols-[auto_1fr] gap-3"
          >
            <Image
              src={endowment.logo}
              className="w-10 h-10 border border-prim rounded-full"
            />

            <div className="grid items-center">
              <Name value={endowment.name} />
              <Links endowmentId={endowment.endowId} />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

const Name = ({ value }: { value: string }) => (
  <span className="font-heading font-semibold text-sm">{value}</span>
);
