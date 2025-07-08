import { Person } from '../../types';
import { PersonLink } from '../PersonLink';

type Props = {
  people: Person[];
};

export const PeopleTable: React.FC<Props> = ({ people }) => {
  const getMotherSlug = (person: Person): string => {
    const slug = people.find(p => p.name === person.motherName)?.slug;

    return slug ?? '';
  };

  const getFatherSlug = (person: Person): string => {
    const slug = people.find(p => p.name === person.fatherName)?.slug;

    return slug ?? '';
  };

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
          <PersonLink
            key={person.slug}
            person={person}
            getMotherSlug={getMotherSlug}
            getFatherSlug={getFatherSlug}
          />
        ))}
      </tbody>
    </table>
  );
};
