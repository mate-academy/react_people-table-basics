import classNames from 'classnames';
import React from 'react';
import { Link } from 'react-router-dom';
import { UpdatePerson } from '../../types/UpdatePerson';
import { ParentLink } from '../ParentLink/ParentLink';

type Props = {
  person: UpdatePerson,
  personSlug: string,
};

export const PersonLink: React.FC<Props> = ({
  person,
  personSlug,
}) => {
  const {
    slug,
    sex,
    name,
    born,
    died,
    mother,
    motherName,
    father,
    fatherName,
  } = person;

  return (
    <tr
      data-cy="person"
      className={classNames({
        'has-background-warning': slug === personSlug,
      })}
    >
      <td>
        <Link
          to={`/people/${slug}`}
          className={classNames({
            'has-text-danger': sex === 'f',
          })}
        >
          {name}
        </Link>
      </td>

      <td>{sex}</td>
      <td>{born}</td>
      <td>{died}</td>
      <td>
        {mother ? <ParentLink parent={mother} /> : motherName}
      </td>
      <td>
        {father ? <ParentLink parent={father} /> : fatherName}
      </td>
    </tr>
  );
};
