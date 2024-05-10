import { FC } from 'react';
import { usePeople } from '../../providers/PeopleProvider';
import { PersonLink } from '../PersonLink';
import classNames from 'classnames';

export const PeopleTable: FC = () => {
  const { people, activePerson } = usePeople();

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
        {people.map(p => (
          <tr
            key={p.slug}
            className={classNames({
              'has-background-warning': p.slug === activePerson?.slug,
            })}
            data-cy="person"
          >
            <td className="has-text-danger">
              <PersonLink person={p} />
            </td>

            <td>{p.sex}</td>
            <td>{p.born}</td>
            <td>{p.died}</td>
            <td>
              {p.mother ? (
                <PersonLink person={p.mother} />
              ) : (
                p.motherName || '-'
              )}
            </td>
            <td>
              {p.father ? (
                <PersonLink person={p.father} />
              ) : (
                p.fatherName || '-'
              )}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};
