import cn from 'classnames';
import type { Person } from '../types/Person';
import { PersonLink } from './PersonLink';

type Props = {
  people: Person[];
  selectedSlug?: string | null;
};

export const PeopleTable = ({ people, selectedSlug }: Props) => {
  const byName = new Map(people.map(p => [p.name, p] as const));

  return (
    <table
      data-cy="peopleTable"
      className={cn(
        'table',
        'is-striped',
        'is-hoverable',
        'is-narrow',
        'is-fullwidth',
      )}
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
          const mother = person.motherName
            ? byName.get(person.motherName)
            : undefined;
          const father = person.fatherName
            ? byName.get(person.fatherName)
            : undefined;

          return (
            <tr
              key={person.slug}
              data-cy="person"
              className={cn({
                'has-background-warning': person.slug === selectedSlug,
              })}
            >
              <td>
                <PersonLink person={person} />
              </td>

              <td>{person.sex}</td>
              <td>{person.born}</td>
              <td>{person.died}</td>

              <td>
                {mother ? (
                  <PersonLink person={mother} />
                ) : person.motherName ? (
                  <span className={cn('has-text-danger')}>
                    {person.motherName}
                  </span>
                ) : (
                  '-'
                )}
              </td>

              <td>
                {father ? (
                  <PersonLink person={father} />
                ) : person.fatherName ? (
                  <span>{person.fatherName}</span>
                ) : (
                  '-'
                )}
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};
