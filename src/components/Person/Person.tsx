import React from 'react';
import { Person as PersonInterface } from '../../types';
import { Link } from 'react-router-dom';

type Props = {
  data: PersonInterface;
  param: string | undefined;
};

export const Person: React.FC<Props> = ({ data, param }) => {
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
  } = data;
  const isFather = fatherName ? fatherName : '-';
  const isMother = motherName ? motherName : '-';

  const isWomenName = sex === 'f' ? 'has-text-danger' : '';

  return (
    <tr
      data-cy="person"
      className={slug === param ? 'has-background-warning' : ''}
    >
      <td>
        <Link className={isWomenName} to={`/people/${slug}`}>
          {name}
        </Link>
      </td>

      <td>{sex}</td>
      <td>{born}</td>
      <td>{died}</td>
      <td>
        {mother?.slug ? (
          <Link className="has-text-danger" to={`/people/${mother?.slug}`}>
            {isMother}
          </Link>
        ) : (
          isMother
        )}
      </td>
      <td>
        {father?.slug ? (
          <Link to={`/people/${father?.slug}`}>{isFather}</Link>
        ) : (
          isFather
        )}
      </td>
    </tr>
  );
};
