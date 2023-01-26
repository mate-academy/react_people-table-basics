import { Person } from '../../types';
import { PersonInfo } from '../PersonInfo';

type Props = {
  peopleList: Person[];
  selectedPersonSlug: string;
};

export const PeopleTable: React.FC<Props> = ({
  peopleList,
  selectedPersonSlug,
}) => {
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
        {peopleList.map((person) => (
          <PersonInfo
            person={person}
            key={person.slug}
            selectedPersonSlug={selectedPersonSlug}
          />
        ))}
      </tbody>
    </table>
  );
};
