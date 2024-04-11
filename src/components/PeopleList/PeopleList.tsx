import { useParams } from 'react-router-dom';
import { Person } from '../../types';

import { Human } from '../Human/Human';

type Props = {
  people: Person[];
};

export const PeopleList: React.FC<Props> = ({ people }) => {
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
        {people.map(person => {
          const personMother = people.find(
            human => human.name === person.motherName,
          );
          const personFather = people.find(
            human => human.name === person.fatherName,
          );

          return (
            <Human
              key={person.slug}
              person={person}
              personMother={personMother}
              personFather={personFather}
              personSlug={slug}
            />
          );
        })}
      </tbody>
    </table>
  );
};
