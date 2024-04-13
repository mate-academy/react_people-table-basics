import { Person } from './types';
import { PersonRow } from './PersonRow';

type Props = {
  people: Person[];
};

const PEOPLE_STATUS = ['Name', 'Sex', 'Born', 'Died', 'Mother', 'Father'];

export const PeopleTable: React.FC<Props> = ({ people }) => {
  const preparedPeople = people.map(person => ({
    ...person,
    mother: people.find(
      personElement => personElement.name === person.motherName,
    ),
    father: people.find(
      personElement => personElement.name === person.fatherName,
    ),
  }));

  return (
    <table
      data-cy="peopleTable"
      className="table is-striped is-hoverable is-narrow is-fullwidth"
    >
      <thead>
        <tr>
          {PEOPLE_STATUS.map((status, index) => (
            <th key={index}>{status}</th>
          ))}
        </tr>
      </thead>

      <tbody>
        {preparedPeople.map(person => (
          <PersonRow key={person.slug} person={person} />
        ))}
      </tbody>
    </table>
  );
};
