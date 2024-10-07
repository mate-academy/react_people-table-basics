import { Person } from '../types';
import PersonLink from './PersonLink';

type Props = {
  people: Person[];
};

const PeopleTable: React.FC<Props> = ({ people }) => {
  const showPeople = people?.map(person => {
    return <PersonLink person={person} people={people} key={person.slug} />;
  });

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

      <tbody>{showPeople}</tbody>
    </table>
  );
};

export default PeopleTable;
