import classNames from 'classnames';
import React from 'react';
import { Person } from '../../types';
import { PersonLink } from '../PersonLink';

type Props = {
  people: Person[]
  selectedSlug: string
};

export const PeopleTable: React.FC<Props> = React.memo(({
  people, selectedSlug,
}) => (
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
        const {
          slug,
          sex,
          born,
          died,
          motherName,
          fatherName,
        } = person;

        const isSlugSelected = slug === selectedSlug;
        const hasMother = motherName || '-';
        const hasFather = fatherName || '-';

        return (
          <tr
            data-cy="person"
            key={person.slug}
            className={classNames(
              { 'has-background-warning': isSlugSelected },
            )}
          >
            <td>
              <PersonLink person={person} />
            </td>

            <td>{sex}</td>
            <td>{born}</td>
            <td>{died}</td>
            <td>
              {person.mother
                ? <PersonLink person={person.mother} />
                : hasMother }
            </td>
            <td>
              {person.father
                ? <PersonLink person={person.father} />
                : hasFather }
            </td>
          </tr>
        );
      })}
    </tbody>
  </table>
));
