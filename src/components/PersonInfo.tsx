import React from 'react';
import cn from 'classnames';
import { Link } from 'react-router-dom';
import { Person } from '../types';

interface Props {
  person: Person;
  personSlug: string;
  getParent: (parentName: string | null) => Person | undefined;
}

export const PersonInfo: React.FC<Props> = ({
  person,
  personSlug,
  getParent,
}) => {
  const {
    name,
    sex,
    born,
    died,
    motherName,
    fatherName,
    slug,
  } = person;

  const isPersonSelected = personSlug === person.slug;

  const mother = getParent(motherName);
  const father = getParent(fatherName);

  return (
    <tr
      data-cy="person"
      className={cn({ 'has-background-warning': isPersonSelected })}
    >
      <td>
        <Link
          to={`/people/${slug}`}
          className={cn({
            'has-text-danger': sex === 'f',
            'has-text-link': sex === 'm',
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
          ? (
            <Link
              to={`/people/${mother.slug}`}
              className="has-text-danger"
            >
              {motherName}
            </Link>
          )
          : motherName || '-'}
      </td>
      <td>
        {father
          ? (
            <Link
              to={`/people/${father.slug}`}
            >
              {fatherName}
            </Link>
          )
          : fatherName || '-'}
      </td>
    </tr>
  );
};
