import { useContext } from 'react';
import { PeopleList } from '../../PeopleContext';
import { PersonLink } from '../personLink/PersonLink';

export const PeopleTable = () => {
  const { peopleList } = useContext(PeopleList);

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
          <PersonLink person={person} key={person.slug} />
        ))}
      </tbody>
    </table>
  );
};
