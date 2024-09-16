import React from 'react';
import { useParams } from 'react-router-dom';
import { Person } from '../../types';
import classNames from 'classnames';
import { PersonLink } from '../PersonLink/PersonLink';

type Props = {
  person: Person;
};

export const PersonItem: React.FC<Props> = ({ person }) => {
  const { slug } = useParams();

  const { name, sex, born, died, motherName, fatherName, mother, father } =
    person;

  return (
    <tr
      data-cy="person"
      key={person.slug}
      className={classNames({
        'has-background-warning': person.slug === slug,
      })}
    >
      <td>
        <PersonLink person={person}>{name}</PersonLink>
      </td>

      <td>{sex}</td>
      <td>{born}</td>
      <td>{died}</td>

      <td>
        {mother && motherName ? (
          <PersonLink person={mother}>{motherName}</PersonLink>
        ) : (
          <p>{motherName || '-'}</p>
        )}
      </td>

      <td>
        {father && fatherName ? (
          <PersonLink person={father}>{fatherName}</PersonLink>
        ) : (
          <p>{fatherName || '-'}</p>
        )}
      </td>
    </tr>
  );
};
