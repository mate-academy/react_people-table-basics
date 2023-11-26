import React from 'react';
import { useParams, Link } from 'react-router-dom';
import classNames from 'classnames';
import { Person } from '../../types';
import { Gender } from '../../types/gender';

type Props = {
  person: Person;
};

export const PersoLink: React.FC<Props> = ({ person }) => {
  const { userSlug } = useParams();
  const {
    name,
    slug,
    sex,
    born,
    died,
    motherName,
    fatherName,
  } = person;

  return (
    <tr
      data-cy="person"
      className={classNames({
        'has-background-warning': slug === userSlug,
      })}
    >
      <td>
        <Link
          to={`/people/${slug}`}
          className={classNames({ 'has-text-danger': sex === Gender.female })}
        >
          {name}
        </Link>
      </td>

      <td>{sex}</td>
      <td>{born}</td>
      <td>{died}</td>
      <td>
        {person.mother ? (
          <Link
            to={`/people/${person.mother.slug}`}
            className="has-text-danger"
          >
            {motherName}
          </Link>
        ) : (motherName || '-')}
      </td>

      <td>
        {person.father ? (
          <Link
            to={`/people/${person.father.slug}`}
          >
            {fatherName}
          </Link>
        ) : (fatherName || '-')}
      </td>
    </tr>
  );
};
