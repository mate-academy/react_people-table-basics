import { Person } from '../../types';
import { PeoplePerson } from './PeoplePerson';

type Props = {
  people: Person[];
  peopleMap: Map<string, Person>;
};

export const PeopleTable: React.FC<Props> = ({ people, peopleMap }) => {
  const getParents = (name: string | null) => {
    if (!name) {
      return '-';
    }

    const parent = peopleMap.get(name);

    if (parent) {
      return parent;
    }

    return name;
  };

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
        {people.map(guy => (
          <PeoplePerson
            key={guy.name}
            guy={guy}
            mama={getParents(guy.motherName)}
            papa={getParents(guy.fatherName)}
          />
        ))}
      </tbody>
    </table>
  );
};
