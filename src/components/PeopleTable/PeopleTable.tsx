import { Person } from '../../types';
import { PersonLink } from '../PersonLink/PersonLink';

interface PeopleListProps {
  peopleList: Person[];
}

export const PeopleTable: React.FC<PeopleListProps> = ({ peopleList }) => {
  const getParent = (name: string) => {
    return peopleList.find(person => person.name === name);
  };

  return (
    <>
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
              key={person.name}
              person={person}
              getParent={getParent}
            />
          ))}
        </tbody>
      </table>
    </>
  );
};
