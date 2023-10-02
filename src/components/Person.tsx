import React from 'react';
import { Link, useParams } from 'react-router-dom';
import cn from 'classnames';
import { PersonType } from '../types';
import { EMPTY_VALUE, FEMALE } from '../utils/constants';
import { PersonLink } from './PersonLink';

type Props = {
  person: PersonType;
};

export const Person: React.FC<Props> = ({ person }) => {
  const { personSlug } = useParams();

  const {
    name,
    sex,
    born,
    died,
    fatherName,
    motherName,
    slug,
    mother,
    father,
  } = person;

  const isFemale = sex === FEMALE;

  return (
    <tr
      data-cy="person"
      className={cn({
        'has-background-warning': slug === personSlug,
      })}
    >
      <td>
        <Link
          to={`../${slug}`}
          className={cn({
            'has-text-danger': isFemale,
          })}
        >
          {name}
        </Link>
      </td>

      <td>{sex}</td>
      <td>{born}</td>
      <td>{died}</td>
      <td>
        {mother ? (
          <PersonLink person={mother} />
        ) : (
          motherName || EMPTY_VALUE
        )}
      </td>
      <td>
        {father ? (
          <PersonLink person={father} />
        ) : (
          fatherName || EMPTY_VALUE
        )}
      </td>
    </tr>
  );
};
