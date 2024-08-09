import React from 'react';
import { Person } from '../../types';
import { PersonLink } from '../PersonLink';
import { useParams } from 'react-router-dom';
import classNames from 'classnames';

interface PersonRowProps {
  person: Person;
}

export const PersonRow: React.FC<PersonRowProps> = ({ person }) => {
  const { slug } = useParams<{ slug: string }>();
  const { sex, born, died, mother, motherName, father, fatherName } = person;
  const defaultName = '-';

  return (
    <tr
      data-cy="person"
      className={classNames({ 'has-background-warning': person.slug === slug })}
    >
      <td>
        <PersonLink person={person} />
      </td>
      <td>{sex}</td>
      <td>{born}</td>
      <td>{died}</td>
      <td>
        {mother ? (
          <PersonLink person={mother} />
        ) : (
          <span>{motherName || defaultName}</span>
        )}
      </td>
      <td>
        {father ? (
          <PersonLink person={father} />
        ) : (
          <span>{fatherName || defaultName}</span>
        )}
      </td>
    </tr>
  );
};
