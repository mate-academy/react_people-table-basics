import { Person } from '../../types';
import { PersonInfo } from '../PersonInfo/PersonInfo';

interface Props {
  people: Person[];
}

export const PeopleTable: React.FC<Props> = ({ people }) => {
  const HEADERS = ['Name', 'Sex', 'Born', 'Died', 'Mother', 'Father'];

  return (
    <table
      data-cy="peopleTable"
      className="table is-striped is-hoverable is-narrow is-fullwidth"
    >
      <thead>
        <tr>
          {HEADERS.map((header) => (
            <th key={header}>{header}</th>
          ))}
        </tr>
      </thead>

      <tbody>
        {people.map((person) => {
          return (
            <PersonInfo
              person={person}
              key={person.slug}
            />
          );
        })}
      </tbody>
    </table>
  );
};
