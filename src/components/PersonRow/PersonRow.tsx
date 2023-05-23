import { FC } from 'react';
import cn from 'classnames';
import { PersonLink } from '../PersonLink/PersonLink';
import { Person } from '../../types';

interface Props {
  person: Person;
  slug: string | undefined;
}

export const PersonRow: FC<Props> = ({ person, slug }) => (
  <tr
    key={person.slug}
    data-cy="person"
    className={cn({
      'has-background-warning': slug === person.slug,
    })}
  >
    <td>
      <PersonLink person={person} />
    </td>

    <td>{person.sex}</td>
    <td>{person.born}</td>
    <td>{person.died}</td>

    <td>
      {person.mother && (<PersonLink person={person.mother} />)}
      {person.motherName && !person.mother && (
        <p>{person.motherName}</p>
      )}
      {!person.motherName && !person.mother && ('-')}
    </td>

    <td>
      {person.father && (<PersonLink person={person.father} />)}
      {person.fatherName && !person.father && (
        <p>{person.fatherName}</p>
      )}
      {!person.fatherName && !person.father && ('-')}
    </td>
  </tr>
);
