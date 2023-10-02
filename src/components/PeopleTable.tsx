import { Person } from '../types';
import { TABLE_COLUMN_NAMES } from '../utils/constants';
import { getPreparedPeople } from '../utils/findPersonByName';
import { PersonInfo } from './PersonInfo';

type Props = {
  people: Person[];
};

export const PeopleTable: React.FC<Props> = ({ people }) => {
  const preparedPeople = getPreparedPeople(people);

  return (
    <table
      data-cy="peopleTable"
      className="table is-striped is-hoverable is-narrow is-fullwidth"
    >
      <thead>
        <tr>
          {TABLE_COLUMN_NAMES.map(columnName => (
            <th key={columnName}>{columnName}</th>
          ))}
        </tr>
      </thead>

      <tbody>
        {preparedPeople.map(person => (
          <PersonInfo person={person} key={person.slug} />
        ))}
      </tbody>
    </table>

  );
};
