import { Person } from '../../types';
import { PersonLink } from '../PersonLink';

type Props = {
  people: Person[];
};

export const PersonTable: React.FC<Props> = ({ people }) => {
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
        {people.map((person, index) => (
          <PersonLink person={person} key={index} />
        ))}
      </tbody>
    </table>
  );
};
