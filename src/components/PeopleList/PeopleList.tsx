import { Person } from '../../types';
import { COLUMN_NAMES } from '../../variables';
import { PersonInfo } from '../PersonInfo';

type Props = {
  people: Person[],
};

export const PeopleList: React.FC<Props> = ({ people }) => {
  return (
    <table
      data-cy="peopleTable"
      className="table is-striped is-hoverable is-narrow is-fullwidth"
    >
      <thead>
        <tr>
          {COLUMN_NAMES.map(value => (
            <th key={value}>
              {value}
            </th>
          ))}
        </tr>
      </thead>

      <tbody>
        {people.map(person => (
          <PersonInfo
            person={person}
            key={person.slug}
          />
        ))}
      </tbody>
    </table>
  );
};
