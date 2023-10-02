import { useParams } from 'react-router-dom';
import { Person } from '../../types';
import { TABLE_ATTRIBUTES } from '../../utils/constants';
import { People } from '../People/People';

type Props = {
  people: Person[];
};

export const PeopleTable: React.FC<Props> = ({ people }) => {
  const { personSlug = '' } = useParams();

  return (
    <table
      data-cy="peopleTable"
      className="table is-striped is-hoverable is-narrow is-fullwidth"
    >
      <thead>
        <tr>
          {TABLE_ATTRIBUTES.map(attribute => (
            <th>{attribute}</th>
          ))}
        </tr>
      </thead>

      <tbody>
        {people.map((person) => (
          <People
            person={person}
            key={person.slug}
            selectedPerson={personSlug}
          />
        ))}
      </tbody>
    </table>
  );
};
