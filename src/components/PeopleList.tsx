import { useParams } from 'react-router-dom';
import { memo } from 'react';
import { Person } from '../types';
import { PersonLink } from './PersonLink';

interface Props {
  people: Person[];
}

export const PeopleList: React.FC<Props> = memo(({ people }) => {
  const { selectedPerson = '' } = useParams();

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
          <PersonLink
            person={person}
            key={person.slug}
            selectedPerson={selectedPerson}
          />
        ))}
      </tbody>
    </table>
  );
});
