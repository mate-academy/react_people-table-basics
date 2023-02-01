import classNames from 'classnames';
import React, { memo } from 'react';
import { Person } from '../../types';
import { PersonLink } from '../PersonLink/PersonLink';

export type Props = {
  people: Person[]
  slug: string | undefined
};

export const PersonTable: React.FC<Props> = memo(({
  people,
  slug = '',
}) => {
  const isSelectedName = (person: Person) => person.slug === slug;

  return (
    <tbody>
      {people.map(person => (
        <tr
          data-cy="person"
          className={classNames(
            { 'has-background-warning': isSelectedName(person) },
          )}
          key={person.slug}
        >
          <td>
            <PersonLink person={person} />
          </td>

          <td>{person.sex}</td>
          <td>{person.born}</td>
          <td>{person.died}</td>

          <td>
            {person.mother
              ? <PersonLink person={person.mother} />
              : <span>{person.motherName || '-'}</span>}
          </td>

          <td>
            {person.father
              ? <PersonLink person={person.father} />
              : <span>{person.fatherName || '-'}</span>}
          </td>
        </tr>
      ))}
    </tbody>
  );
});
