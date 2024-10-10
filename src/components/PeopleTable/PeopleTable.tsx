import { useContext } from 'react';
import { PersonItem } from '../PersonItem';
import { PeopleContext } from '../../peopleContext';

export const PeopleTable: React.FC = () => {
  const people = useContext(PeopleContext);

  if (!people.length) {
    return;
  }

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
          <PersonItem key={person.slug} person={person} />
        ))}
      </tbody>
    </table>
  );
};
