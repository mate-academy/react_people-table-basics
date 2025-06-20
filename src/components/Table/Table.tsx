import { TableBody } from "../TableBody";
import { TableHead } from "../TableHead";

type Props = {
  selectedSlug: string | undefined;
}

export const Table:React.FC<Props> = ({ selectedSlug }) => (
  <table
    data-cy="peopleTable"
    className="table is-striped is-hoverable is-narrow is-fullwidth"
  >
    <TableHead />
    <TableBody selectedSlug={selectedSlug} />
  </table>
);
