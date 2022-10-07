import { Person } from '../types';
import { PeopleTableInfo } from './PeopleTableInfo';

interface Props {
  persons: Person[];
  findParent: (name: string) => Person | undefined;
  onSelectedPerson: string | undefined;
}

export const PeopleTableList: React.FC<Props> = ({
  persons,
  findParent,
  onSelectedPerson,
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
        {persons.map(person => (
          <PeopleTableInfo
            person={person}
            findParent={findParent}
            onSelectedPerson={onSelectedPerson}
          />
        ))}
      </tbody>
    </table>
  );
};
