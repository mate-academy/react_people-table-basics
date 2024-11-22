import { useContext } from 'react';
import { PeopleContext } from '../store/PeopleContent';
import { PersonLink } from './PersonLink';

export const PeopleTable: React.FC = () => {
  const { people } = useContext(PeopleContext);

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
        {people.map(personItem => {
          return <PersonLink key={personItem.slug} person={personItem} />;
        })}
      </tbody>
    </table>
  );
};
