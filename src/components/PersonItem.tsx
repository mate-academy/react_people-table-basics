import React from 'react';
import { useParams } from 'react-router-dom';
import classNames from 'classnames';
import { Person } from '../types';

type Props = {
  person: Person
};

export const PersonItem: React.FC<Props> = ({ person }) => {
  const {
    name,
    sex,
    born,
    died,
    fatherName,
    motherName,
    mother,
    father,
    slug,
  } = person;

  const { peopleSlug } = useParams();

  return (
    <tr
      data-cy="person"
      className={classNames({ 'has-background-warning': peopleSlug === slug })}
    >
      <td>
        <a
          className={classNames({ 'has-text-danger': sex === 'f' })}
          href={`#/people/${slug}`}
        >
          {name}
        </a>
      </td>

      <td>{sex}</td>
      <td>{born}</td>
      <td>{died}</td>
      <td>
        {mother ? (
          <a
            className="has-text-danger"
            href={`#/people/${mother.slug}`}
          >
            {motherName}
          </a>
        ) : (
          motherName || '-'
        )}
      </td>

      <td>
        {father ? (
          <a
            href={`#/people/${father.slug}`}
          >
            {fatherName}
          </a>
        ) : (
          fatherName || '-'
        )}
      </td>
    </tr>
  );
};
