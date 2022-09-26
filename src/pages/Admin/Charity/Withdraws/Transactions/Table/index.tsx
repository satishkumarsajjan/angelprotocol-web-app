import { WithdrawLog } from "types/aws";
import TableSection, { Cells } from "components/TableSection";
import LogRow from "./LogRow";

type Props = {
  withdraws: WithdrawLog[];
  classes?: string;
};

export default function Table({ withdraws, classes = "" }: Props) {
  return (
    <table className={`w-full mt-6 ${classes}`}>
      <TableSection type="thead" rowClass="border-b-2 border-zinc-50/20">
        <Cells
          type="th"
          cellClass="text-left font-heading text-zinc-50/80 uppercase p-2"
        >
          <>Amount</>
          <>Receiver</>
          <>Status</>
          <>Amount Received</>
          <>Transaction hash</>
        </Cells>
      </TableSection>
      <TableSection type="tbody" rowClass="border-b border-zinc-50/10">
        {withdraws.map((log, i) => (
          <LogRow {...log} key={i} />
        ))}
      </TableSection>
    </table>
  );
}
