import React from 'react';
import { Link, useParams } from 'react-router-dom';
import classNames from 'classnames';
import { Person } from '../types/Person';

type Props = {
  person: Person;
};

export const PersonLink: React.FC<Props> = ({ person }) => {
  const { slug } = useParams();
  const {
    sex,
    born,
    name,
    died,
    motherName,
    fatherName,
    mother,
    father,
  } = person;

  const generateParentLink = (parent: 'mother' | 'father') => {
    if (person[parent]) {
      return (
        <Link
          className={person[parent]!.sex === 'f' ? 'has-text-danger' : ''}
          to={`${person[parent]!.slug}`}
        >
          {person[parent]!.name}
        </Link>
      );
    }

    return '-';
  };

  return (
    <tr
      data-cy="person"
      className={classNames({ 'has-background-warning': slug === person.slug })}
    >
      <td>
        <Link
          to={`${person.slug}`}
          className={classNames({ 'has-text-danger': sex === 'f' })}
        >
          {name}
        </Link>
      </td>
      <td>{sex}</td>
      <td>{born}</td>
      <td>{died}</td>
      <td>{(mother ? generateParentLink('mother') : motherName) || '-'}</td>
      <td>{(father ? generateParentLink('father') : fatherName) || '-'}</td>
    </tr>
  );
};
