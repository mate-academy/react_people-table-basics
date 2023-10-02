import { useParams } from 'react-router-dom';
import { Person } from '../types';
import { PersonPage } from './PersonPage';

export const PeopleTable = ({ people }: { people: Person[] }) => {
  const { personId = '' } = useParams();

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
        {people.map((person) => (
          <PersonPage
            person={person}
            key={person.slug}
            selectedPerson={personId}
          />
        ))}
      </tbody>
    </table>
  );
};
