import { useParams } from 'react-router-dom';
import { Person } from '../../types';
import { PeopleRow } from './PersonRow';

type Props = {
  people: Person[];
};

export const PeopleTable: React.FC<Props> = ({ people }) => {
  const { slug } = useParams();

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
        {people.map(person => (
          <PeopleRow
            personToRender={person}
            people={people}
            slug={slug}
            key={person.slug}
          />
        ))}
      </tbody>
    </table>
  );
};
