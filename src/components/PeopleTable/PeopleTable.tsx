import { useParams } from 'react-router-dom';
import { PersonType } from '../../types';
import { Person } from '../Person/Person';
import { TABLE_ATTRIBUTES } from '../../utils/constants';

export const PeopleTable = ({ people }: { people: PersonType[] }) => {
  const { personId = '' } = useParams();

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
          <Person
            person={person}
            key={person.slug}
            selectedPerson={personId}
          />
        ))}
      </tbody>
    </table>
  );
};
