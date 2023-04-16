import { useParams } from 'react-router-dom';
import { Person } from '../types';
import { PersonRowInfo } from './PersonRowInfo';

interface Props {
  people: Person[];
  // selectedSlug: string,
}

export const PeopleTable: React.FC<Props> = ({ people }) => {
  // const { people, selectedSlug } = props;
  const { slug: selectedSlug = '' } = useParams();

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
          <PersonRowInfo
            person={person}
            selectedSlug={selectedSlug}
            key={person.slug}
          />
        ))}
      </tbody>
    </table>
  );
};
