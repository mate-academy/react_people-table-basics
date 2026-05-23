import { Person } from '../../types';
import { PersonLink } from '../PersonLink/PersonLink';

interface Props {
  people: Person[];
  selectedSlug: string | null;
  onSelect: (slug: string) => void;
}

export const PeopleTable = ({ people, selectedSlug, onSelect }: Props) => {
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
          const mother = people.find(p => p.name === person.motherName);
          const father = people.find(p => p.name === person.fatherName);

          const isSelected = person.slug === selectedSlug;

          return (
            <tr
              data-cy="person"
              key={person.slug}
              onClick={() => onSelect(person.slug)}
              className={isSelected ? 'has-background-warning' : ''}
            >
              <td>
                <PersonLink person={person} />
              </td>
              <td>{person.sex}</td>
              <td>{person.born}</td>
              <td>{person.died}</td>
              <td>
                {!person.motherName && '-'}
                {person.motherName && mother && <PersonLink person={mother} />}
                {person.motherName && !mother && (
                  <span className="has-text-danger">{person.motherName}</span>
                )}
              </td>
              <td>
                {!person.fatherName && '-'}
                {person.fatherName && father && <PersonLink person={father} />}
                {person.fatherName && !father && (
                  <span>{person.fatherName}</span>
                )}
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};
