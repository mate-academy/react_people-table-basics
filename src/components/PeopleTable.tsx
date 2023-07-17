import { Person } from '../types';
import { PersonInfo } from './PersonInfo';
import { getPersonByName } from '../helpers';

interface Props {
  people: Person[];
}

const columnNames = ['Name', 'Sex', 'Born', 'Died', 'Mother', 'Father'];

export const PeopleTable: React.FC<Props> = ({ people }) => (
  <table
    data-cy="peopleTable"
    className="table is-striped is-hoverable is-narrow is-fullwidth"
  >
    <thead>
      <tr>
        {columnNames.map(name => (
          <th key={name}>{name}</th>
        ))}
      </tr>
    </thead>

    <tbody>
      {people.map(person => (
        <PersonInfo
          key={person.slug}
          person={person}
          mother={getPersonByName(people, person.motherName)}
          father={getPersonByName(people, person.fatherName)}
        />
      ))}
    </tbody>
  </table>
);
