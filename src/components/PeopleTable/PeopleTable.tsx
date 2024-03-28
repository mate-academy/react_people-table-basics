import { Person } from '../../types';
import { PersonRow } from '../PersonRow';

type Props = {
  people: Person[];
};

export const PeopleTable: React.FC<Props> = ({ people }) => {
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
          const { motherName, fatherName } = person;

          const mother = people.find(parent => parent.name === motherName);
          const father = people.find(parent => parent.name === fatherName);

          return (
            <PersonRow
              key={person.slug}
              person={person}
              mother={mother}
              father={father}
            />
          );
        })}
      </tbody>
    </table>
  );
};
