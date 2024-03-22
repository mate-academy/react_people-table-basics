import React from 'react';
import { Person } from '../../types';
import classNames from 'classnames';
import { useParams } from 'react-router-dom';

type Props = {
  person: Person;
};

export const PersonLink: React.FC<Props> = ({ person }) => {
  const {
    name,
    sex,
    born,
    died,
    fatherName,
    motherName,
    slug: personSlug,
    mother,
    father,
  } = person;
  const { slug } = useParams();

  return (
    <tr
      data-cy="person"
      className={classNames({ 'has-background-warning': slug === personSlug })}
    >
      <td>
        <a
          href={`#/people/${personSlug}`}
          className={classNames({
            'has-text-danger': sex === 'f',
          })}
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
            href={`#/people/${mother.slug}`}
            className={classNames({
              'has-text-danger': mother.sex === 'f',
            })}
          >
            {mother.name}
          </a>
        ) : (
          motherName || '-'
        )}
      </td>
      <td>
        {father ? (
          <a
            href={`#/people/${father.slug}`}
            className={classNames({
              'has-text-danger': father.sex === 'f',
            })}
          >
            {father.name}
          </a>
        ) : (
          fatherName || '-'
        )}
      </td>
    </tr>
  );
};
