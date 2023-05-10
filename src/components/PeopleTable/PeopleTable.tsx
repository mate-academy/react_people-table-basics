import { FC, memo } from 'react';
import { useParams } from 'react-router-dom';
import { PersonInfo } from '../PersonInfo';
import { Person } from '../../types';

interface Props {
  people: Person[];
}
export const PeopleTable: FC<Props> = memo(({ people }) => {
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
        {people.map(person => (
          <PersonInfo
            person={person}
            key={person.slug}
            selectedPerson={selectedPerson}
          />
        ))}
      </tbody>
    </table>
  );
});
