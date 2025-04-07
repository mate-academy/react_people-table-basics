import { Person } from '../types/Person';
import { PeopleLink } from './PersonLink';

type Props = {
  peoples: Person[];
};

export const PeopleTable: React.FC<Props> = ({ peoples }) => {
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
        {peoples.map((person: Person) => (
          <PeopleLink person={person} peoples={peoples} key={person.slug} />
        ))}
      </tbody>
    </table>
  );
};
