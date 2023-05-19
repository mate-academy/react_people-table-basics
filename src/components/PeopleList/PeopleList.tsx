import { useParams } from 'react-router-dom';
import { Person } from '../../types';
import { NewPerson } from '../NewPerson';

type Props = {
  people: Person[];
};

export const PeopleList: React.FC<Props> = ({ people }) => {
  const { selectedPerson } = useParams();

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
        {people.map((person) => (
          <NewPerson
            key={person.slug}
            person={person}
            selectedPerson={selectedPerson}
          />
        ))}
      </tbody>
    </table>
  );
};
