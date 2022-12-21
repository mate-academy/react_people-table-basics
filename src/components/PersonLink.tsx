import classNames from 'classnames';
import React from 'react';
import { Link } from 'react-router-dom';
import { Person } from '../types/Person';

type Props = {
  person: Person,
  isSelected: (slug: string) => boolean,
  getParent: (parentName: string | null) => Person | undefined,
};

export const PersonLink: React.FC<Props> = (
  { person, isSelected, getParent },
) => {
  const {
    name,
    sex,
    born,
    died,
    motherName,
    fatherName,
    slug,
  } = person;

  // eslint-disable-next-line no-param-reassign
  person.mother = getParent(motherName);
  // eslint-disable-next-line no-param-reassign
  person.father = getParent(fatherName);

  return (
    <tr
      data-cy="person"
      className={classNames({
        'has-background-warning': isSelected(slug),
      })}
    >
      <td>
        <Link
          className={classNames({
            'has-text-danger': sex === 'f',
          })}
          to={`/people/${slug}`}
        >
          {name}
        </Link>
      </td>

      <td>{sex}</td>
      <td>{born}</td>
      <td>{died}</td>
      <td>
        {person.mother
          ? (
            <Link
              className="has-text-danger"
              to={`/people/${person.mother?.slug}`}
            >
              {motherName}
            </Link>
          )
          : (
            <>
              {motherName || '-'}
            </>
          )}
      </td>
      <td>
        {person.father
          ? (
            <Link
              className="has-text-blue"
              to={`/people/${person.father?.slug}`}
            >
              {fatherName}
            </Link>
          )
          : (
            <>
              {fatherName || '-'}
            </>
          )}
      </td>
    </tr>
  );
};
