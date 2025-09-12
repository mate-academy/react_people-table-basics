import { Person } from '../types/Person';

import { PersonLink } from './PersonLink';

interface Props {
  people: Person[];
  selectedSlug?: string;
}

export const PeopleTable = ({ people, selectedSlug }: Props) => (
  <table
    className="table is-striped is-hoverable is-narrow is-fullwidth"
    data-cy="peopleTable"
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
      {people.map(p => {
        const mother = people.find(m => m.name === p.motherName);
        const father = people.find(f => f.name === p.fatherName);

        return (
          <tr
            key={p.slug}
            className={p.slug === selectedSlug ? 'has-background-warning' : ''}
            data-cy="person"
          >
            <td>
              <PersonLink person={p} />
            </td>
            <td>{p.sex}</td>
            <td>{p.born}</td>
            <td>{p.died}</td>
            <td>
              {!p.motherName ? (
                <span>-</span>
              ) : mother ? (
                <PersonLink person={mother} />
              ) : (
                <span>{p.motherName}</span>
              )}
            </td>
            <td>
              {!p.fatherName ? (
                <span>-</span>
              ) : father ? (
                <PersonLink person={father} />
              ) : (
                <span>{p.fatherName}</span>
              )}
            </td>
          </tr>
        );
      })}
    </tbody>
  </table>
);
