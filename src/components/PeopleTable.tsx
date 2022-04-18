import { FC, memo } from 'react';
import PersonRow from './PersonRow';

type Props = {
  people: Person[];
};

const PeopleTable: FC<Props> = memo(({ people }) => (
  <>
    {people.length > 0 && (
      <table className="
            table
            is-narrow
            is-hoverable
            is-fullwidth"
      >
        <thead>
          <tr>
            <th>Name</th>
            <th>Sex</th>
            <th>Born</th>
            <th>Died</th>
            <th>Father</th>
            <th>Mother</th>
          </tr>
        </thead>
        <tbody>
          {people.map((person) => (
            <PersonRow
              key={person.slug}
              person={person}
            />
          ))}
        </tbody>
      </table>
    )}
  </>
));

export default PeopleTable;
