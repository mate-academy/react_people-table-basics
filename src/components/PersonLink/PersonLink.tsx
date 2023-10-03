import React from 'react';
import { Link, useParams } from 'react-router-dom';
import { Person } from '../../types';
import { FEMALE, NO_PARENT } from '../../utils/constants';

type Props = {
  person: Person,
};

export const PersonLink: React.FC<Props> = ({ person }) => {
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

  const { personId } = useParams();

  return (
    <tr
      data-cy="person"
      className={personId === slug ? 'has-background-warning' : ''}
    >
      <td>
        <Link
          to={`/people/${slug}`}
          className={sex === FEMALE ? 'has-text-danger' : ''}
        >
          {name}
        </Link>
      </td>

      <td>{sex}</td>
      <td>{born}</td>
      <td>{died}</td>
      <td>
        {mother ? (
          <Link
            to={`/people/${mother.slug}`}
            className="has-text-danger"
          >
            {mother.name}
          </Link>
        ) : (
          <p>
            {motherName ? `${motherName}` : NO_PARENT}
          </p>
        )}
      </td>
      <td>
        {father ? (
          <Link to={`/people/${father.slug}`}>
            {father.name}
          </Link>
        ) : (
          <p>
            {fatherName ? `${fatherName}` : NO_PARENT}
          </p>
        )}
      </td>
    </tr>
  );
};
