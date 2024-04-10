import { Person } from '../types';
import { PersonDetails } from './PersonDetails';

type Props = {
  people: Person[];
};

const columns = ['Name', 'Sex', 'Born', 'Died', 'Mother', 'Father'];

export const PeopleTable: React.FC<Props> = ({ people }) => {
  return (
    <table
      data-cy="peopleTable"
      className="table is-striped is-hoverable is-narrow is-fullwidth"
    >
      <thead>
        <tr>
          {columns.map(column => (
            <th key={column}>{column}</th>
          ))}
        </tr>
      </thead>

      <tbody>
        {people.map(person => (
          <PersonDetails person={person} key={person.slug} />
        ))}
      </tbody>
    </table>
  );
};
