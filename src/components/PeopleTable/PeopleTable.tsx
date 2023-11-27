import { Person } from '../../types';
import { PeopleList } from '../PeopleList';
import { tableHeaders } from '../../utils/variables';

type Props = {
  people: Person[]
};

export const PeopleTable = ({ people }: Props) => {
  return (
    <table
      data-cy="peopleTable"
      className="table is-striped is-hoverable is-narrow is-fullwidth"
    >
      <thead>
        <tr>
          {tableHeaders.map(tableHeader => (
            <th key={tableHeader}>{tableHeader}</th>
          ))}
        </tr>
      </thead>
      <PeopleList people={people} />
    </table>
  );
};
