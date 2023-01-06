import classNames from 'classnames';
import React from 'react';
import { Link } from 'react-router-dom';
import { UpdatePerson } from '../../types/UpdatePerson';

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
        {mother && (
          <Link
            to={`/people/${mother.slug}`}
            className="has-text-danger"
          >
            {mother.name}
          </Link>
        )}

        {!mother && motherName}
      </td>
      <td>
        {father && (
          <Link to={`/people/${father.slug}`}>
            {father.name}
          </Link>
        )}

        {!father && fatherName}
      </td>
    </tr>
  );
};
