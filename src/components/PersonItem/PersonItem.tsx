import React from 'react';
import classNames from 'classnames';
import { Link } from 'react-router-dom';
import { Person } from '../../types';
import { PersonLink } from '../PersonLink/PersonLink';
import { FEMALE, NO_PARENT } from '../../constants/default.constants';

type Props = {
  person: Person,
  chosenUserSlug: string,
};

export const PersonItem: React.FC<Props> = ({ person, chosenUserSlug }) => {
  const {
    name,
    slug,
    sex,
    born,
    died,
    father,
    mother,
    fatherName,
    motherName,
  } = person;

  return (
    <tr
      data-cy="person"
      className={classNames({
        'has-background-warning': slug === chosenUserSlug,
      })}
    >
      <td>
        <Link
          to={`../${slug}`}
          className={classNames({
            'has-text-danger': sex === FEMALE,
          })}
        >
          {name}
        </Link>
      </td>

      <td>{sex}</td>
      <td>{born}</td>
      <td>{died}</td>
      <td>
        {mother
          ? <PersonLink person={mother} />
          : motherName || NO_PARENT}
      </td>
      <td>
        {father
          ? <PersonLink person={father} />
          : fatherName || NO_PARENT}
      </td>
    </tr>
  );
};
