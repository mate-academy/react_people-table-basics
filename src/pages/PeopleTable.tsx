import { useContext } from 'react';
import { PeopleContext } from '../store/PeopleConetxt';
import { Person } from '../components/Person/Person';

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
          <Person person={person} key={person.slug} />
        ))}
      </tbody>
    </table>
  );
};
