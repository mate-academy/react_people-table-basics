import React from 'react';
import { Person } from '../../types';
import { Link, useParams } from 'react-router-dom';
import classNames from 'classnames';

type Props = {
  person: Person;
  isInList: (name: string) => Person | undefined;
};

export const PersonLink: React.FC<Props> = ({ person, isInList }) => {
  const {
    slug: personSlug,
    name,
    sex,
    born,
    died,
    motherName,
    fatherName,
  } = person;

  const { slug } = useParams();

  return (
    <tr
      key={personSlug}
      data-cy="person"
      className={classNames({ 'has-background-warning': personSlug === slug })}
    >
      <td>
        <Link
          to={`${personSlug}`}
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
        {motherName ? (
          isInList(motherName) ? (
            <Link
              className="has-text-danger"
              to={`${isInList(motherName)?.slug}`}
            >
              {motherName}
            </Link>
          ) : (
            motherName
          )
        ) : (
          '-'
        )}
      </td>

      <td>
        {fatherName ? (
          isInList(fatherName) ? (
            <Link to={`${isInList(fatherName)?.slug}`}>{fatherName}</Link>
          ) : (
            fatherName
          )
        ) : (
          '-'
        )}
      </td>
    </tr>
  );
};
