import { useParams } from 'react-router-dom';
import { Person } from '../../types';
import { PeopleListItem } from '../PeopleListItem';
import { TABLE_ATTRIBUTES } from '../../utils/constants';

interface Props {
  people: Person[];
}

export const PeopleList: React.FC<Props> = ({ people }) => {
  const { selectedPersonSlug = '' } = useParams();

  return (
    <table
      data-cy="peopleTable"
      className="table is-striped is-hoverable is-narrow is-fullwidth"
    >
      <thead>
        <tr>
          {TABLE_ATTRIBUTES.map(attribute => (
            <th key={attribute}>
              {attribute}
            </th>
          ))}
        </tr>
      </thead>

      <tbody>
        {people.map(person => (
          <PeopleListItem
            person={person}
            key={person.slug}
            selectedPersonSlug={selectedPersonSlug}
          />
        ))}
      </tbody>
    </table>
  );
};
