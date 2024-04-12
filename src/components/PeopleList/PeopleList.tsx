import { useParams } from 'react-router-dom';
import { Person } from '../../types';

import { Human } from '../Human/Human';

type Props = {
  people: Person[];
};

export const PeopleList: React.FC<Props> = ({ people }) => {
  const { slug } = useParams();
  const tableColumnNames = ['Name', 'Sex', 'Born', 'Died', 'Mother', 'Father'];

  return (
    <table
      data-cy="peopleTable"
      className="table is-striped is-hoverable is-narrow is-fullwidth"
    >
      <thead>
        <tr>
          {tableColumnNames.map(columnName => (
            <th key={columnName}>{columnName}</th>
          ))}
        </tr>
      </thead>

      <tbody>
        {people.map(person => (
          <Human key={person.slug} selectedSlug={slug} person={person} />
        ))}
      </tbody>
    </table>
  );
};
