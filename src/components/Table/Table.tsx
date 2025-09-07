import { TableRow } from '../TableRow/TableRow';
import { Person } from '../../types';

type Props = {
  people?: Person[];
  isLoading: boolean;
};

export const Table: React.FC<Props> = ({ people, isLoading }) => {
  return (
    <>
      {!isLoading && (
        <table
          data-cy="peopleTable"
          className="table is-striped is-hoverable is-narrow is-fullwidth"
        >
          <thead>
            <tr>
              <th>Name</th>
              <th>Sex</th>
              <th>Born</th>
              <th>Died</th>
              <th>Mother</th>
              <th>Father</th>
            </tr>
          </thead>

          <tbody>
            {people?.map((person: Person) => (
              <TableRow person={person} key={person.slug} />
            ))}
          </tbody>
        </table>
      )}
    </>
  );
};
