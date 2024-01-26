import { Person } from '../types';
import { PersonRow } from './PersonRow';

export const PeopleTable: React.FC<{ people: Person[] }> = ({ people }) => {
  const preparedPeople = people.map(person => {
    const father = people.find(human => human.name === person.fatherName);
    const mother = people.find(human => human.name === person.motherName);

    return { ...person, father, mother };
  });

  return (
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
        {preparedPeople.map(person => (
          <PersonRow
            key={person.slug}
            person={person}
          />
        ))}
      </tbody>
    </table>
  );
};
