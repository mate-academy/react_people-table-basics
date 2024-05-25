import React from 'react';
import { Person } from '../types';
import { Link, useParams } from 'react-router-dom';
import classNames from 'classnames';

interface Props {
  person: Person;
  womanNames: Person[];
  manNames: Person[];
}

export const PeopleTable: React.FC<Props> = (
  { person, womanNames, manNames }
) => {
  const { peopleSlug } = useParams();

  const linkMansNames = manNames.some(
    (man) => man.name === person.fatherName
  );
  const linkWomansNames = womanNames.some(
    (woman) => woman.name === person.motherName
  );

  const womanNameToSlug = womanNames.reduce((acc, woman) => ({
    ...acc,
    [woman.name]: woman.slug,
  }), {} as Record<string, string>);

  const manNameToSlug = manNames.reduce((acc, man) => ({
    ...acc,
    [man.name]: man.slug,
  }), {} as Record<string, string>);

  const womanSlug = person.motherName
    ? womanNameToSlug[person.motherName] || '' : '';
  const manSlug = person.fatherName
    ? manNameToSlug[person.fatherName] || '' : '';

  return (
    <tr
      data-cy="person"
      className={classNames(
        { "has-background-warning": person.slug === peopleSlug},
      )}
    >
      <td>
        <Link
          to={`/people/${person.slug}`}
          className={classNames(
            { "has-text-danger": person.sex === 'f' },
          )}
        >
          {person.name}
        </Link>
      </td>
      <td>{person.sex}</td>
      <td>{person.born}</td>
      <td>{person.died}</td>
      {linkWomansNames
        ? (
          <td>
            <Link
              to={`/people/${womanSlug}`}
              className={classNames({
                "has-text-danger": linkWomansNames
              })}
            >
              {person.motherName ?? '-'}
            </Link>
          </td>
        ) : (
          <td
            className={classNames({
              "has-text-danger":
                womanNames.some(
                  (woman) => woman.name === person.motherName
                )
            })}
          >
            {person.motherName ?? '-'}
          </td>
        )
      }

      {linkMansNames
        ? (
          <td>
            <Link to={`/people/${manSlug}`}>
              {person.fatherName ?? '-'}
            </Link>
          </td>
        ) : (
          <td>{person.fatherName ?? '-'}</td>
        )
      }
    </tr>
  );
};
