import { useGlobalState } from '../../store/GlobalProvider';
import { PersonLink } from '../PersonLink/PersonLink';

export const PeopleTable = () => {
  const { people } = useGlobalState();

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
        {people.map(person => {
          return <PersonLink person={person} key={person.slug} />;
        })}
      </tbody>
    </table>
  );
};
