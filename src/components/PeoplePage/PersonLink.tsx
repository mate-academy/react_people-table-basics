import cn from 'classnames';
import React from 'react';
import { Person } from '../../types';
import { Link } from 'react-router-dom';
import { ParentLink } from './ParentLink';
import { Sex } from '../../types/Sex';

type Props = {
  person: Person;
  currentPerson?: { slug: string };
  mother?: Person;
  father?: Person;
};

export const PersonLink: React.FC<Props> = ({
  person,
  currentPerson,
  mother,
  father,
}) => {
  const { name, born, died, sex, motherName, fatherName, slug } = person;

  return (
    <tr
      data-cy="person"
      className={cn({
        'has-background-warning': slug === currentPerson?.slug,
      })}
    >
      <td>
        <Link
          to={`/people/${slug}`}
          className={cn({ 'has-text-danger': sex === Sex.Female })}
        >
          {name}
        </Link>
      </td>

      <td>{sex}</td>
      <td>{born}</td>
      <td>{died}</td>
      <td>{(mother && <ParentLink person={mother} />) || motherName || '-'}</td>
      <td>{(father && <ParentLink person={father} />) || fatherName || '-'}</td>
    </tr>
  );
};
