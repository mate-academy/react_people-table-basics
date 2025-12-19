import { PersonLink } from './PersonLink';
import { Person } from '../types/Person';
import { useMemo } from 'react';

interface PeopleTableProps {
  people: Person[] | null;
  selectedSlug?: string;
  onSelect?(slug: string): void;
}

export function PeopleTable({
  people,
  selectedSlug,
  onSelect,
}: PeopleTableProps) {
  const byName = useMemo(
    () => new Map((people ?? []).map(p => [p.name, p])),
    [people],
  );

  if (people === null) {
    return <p>Loading...</p>;
  }

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
          const mother = person.motherName
            ? byName.get(person.motherName)
            : undefined;
          const father = person.fatherName
            ? byName.get(person.fatherName)
            : undefined;

          const motherCell = !person.motherName ? (
            '-'
          ) : mother ? (
            <PersonLink
              person={mother}
              onClick={e => {
                e.stopPropagation();
                onSelect?.(mother.slug);
              }}
            />
          ) : (
            person.motherName
          );

          const fatherCell = !person.fatherName ? (
            '-'
          ) : father ? (
            <PersonLink
              person={father}
              onClick={e => {
                e.stopPropagation();
                onSelect?.(father.slug);
              }}
            />
          ) : (
            person.fatherName
          );

          return (
            <tr
              key={person.slug}
              data-cy="person"
              onClick={() => onSelect?.(person.slug)}
              className={
                person.slug === selectedSlug ? 'has-background-warning' : ''
              }
            >
              <td>
                <PersonLink person={person} />
              </td>
              <td>{person.sex === 'female' ? 'f' : 'm'}</td>
              <td>{person.born}</td>
              <td>{person.died}</td>
              <td>{motherCell}</td>
              <td>{fatherCell}</td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
}
