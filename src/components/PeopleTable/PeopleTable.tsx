import { useContext } from 'react';
import { PersonLink } from '../PersonLink';
import { PeopleContext } from '../../PeopleContext';

export const PeopleTable = () => {
  const { peopleList } = useContext(PeopleContext);

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
        {peopleList.map(person => (
          <PersonLink
            person={person}
            key={person.slug}
          />
        ))}
      </tbody>
    </table>
  );
};
