import React from 'react';
import { Person } from '../../types';
import { PersonLink } from '../PersonLink';
import cn from 'classnames';

interface Props {
  people: Person[];
  selectedPersonSlug: string;
}

export const PersonList: React.FC<Props> = ({ people, selectedPersonSlug }) => (
  <tbody>
    {people.map(person => (
      <tr
        key={person.slug}
        data-cy="person"
        className={cn({
          'has-background-warning': selectedPersonSlug === person.slug,
        })}
      >
        <td>
          <PersonLink person={person} />
        </td>

        <td>{person.sex}</td>
        <td>{person.born}</td>
        <td>{person.died}</td>
        {person.mother ? (
          <td>
            <PersonLink person={person.mother} />
          </td>
        ) : (
          <td>{person.motherName || '-'}</td>
        )}
        {person.father ? (
          <td>
            <PersonLink person={person.father} />
          </td>
        ) : (
          <td>{person.fatherName || '-'}</td>
        )}
      </tr>
    ))}
  </tbody>
);
