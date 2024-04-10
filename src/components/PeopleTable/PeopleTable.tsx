import { Person } from '../../types';
import { PersonTableRow } from '../PersonTableRow/PersonTableRow';

const COLUMN_NAMES = ['Name', 'Sex', 'Born', 'Died', 'Mother', 'Father'];

interface Props {
  people: Person[];
}

export const PeopleTable: React.FC<Props> = ({ people }) => {
  const preparedPeople = people.map(person => ({
    ...person,
    mother: people.find(personItem => personItem.name === person.motherName),
    father: people.find(personItem => personItem.name === person.fatherName),
  }));

  return (
    <table
      data-cy="peopleTable"
      className="table is-striped is-hoverable is-narrow is-fullwidth"
    >
      <thead>
        <tr>
          {COLUMN_NAMES.map(name => (
            <th key={name}>{name}</th>
          ))}
        </tr>
      </thead>

      <tbody>
        {preparedPeople.map(person => (
          <PersonTableRow key={person.slug} person={person} />
        ))}
      </tbody>
    </table>
  );
};
