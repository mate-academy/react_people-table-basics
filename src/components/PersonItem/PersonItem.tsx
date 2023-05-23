import React from 'react';
import { useParams } from 'react-router-dom';
import cn from 'classnames';
import { PersonLink } from '../PersonLink';
import { Person } from '../../types';

type Props = {
  person: Person;
};

export const PersonItem: React.FC<Props> = ({ person }) => {
  const { slug } = useParams();

  return (
    <tr
      data-cy="person"
      key={person.name}
      className={cn({
        'has-background-warning': person.slug === slug,
      })}
    >
      <td>
        <PersonLink person={person} />
      </td>

      <td>{person.sex}</td>
      <td>{person.born}</td>
      <td>{person.died}</td>
      <td>
        {person.mother && <PersonLink person={person.mother} />}
        {person.motherName && !person.mother && (
          <p>{person.motherName}</p>
        )}
        {!person.motherName && '-'}
      </td>
      <td>
        {person.father && <PersonLink person={person.father} />}
        {person.fatherName && !person.father && (
          <p>{person.fatherName}</p>
        )}
        {!person.fatherName && '-'}
      </td>
    </tr>
  );
};
