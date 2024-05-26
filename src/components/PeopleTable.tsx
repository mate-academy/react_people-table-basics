import React from 'react';
import { Person } from '../types';
import { Link, useParams } from 'react-router-dom';
import classNames from 'classnames';

interface Props {
  person: Person;
  womenNames: Person[];
  manNames: Person[];
}

export const PeopleTable: React.FC<Props> = (
  { person, womenNames, manNames }
) => {
  const { peopleSlug } = useParams();

  const linkWomansNames =
    womenNames.some((woman) => woman.name === person.motherName);
  const linkMansNames =
    manNames.some((man) => man.name === person.fatherName);

  const womanSlug = womenNames.find(
    woman => woman.name === person.motherName
  )?.slug || '';
  const manSlug = manNames.find(
    man => man.name === person.fatherName
  )?.slug || '';

  return (
    <tr
      data-cy="person"
      className={classNames(
        { "has-background-warning": person.slug === peopleSlug }
      )}
    >
      <td>
        <Link
          to={`/people/${person.slug}`}
          className={classNames({ "has-text-danger": person.sex === 'f' })}
        >
          {person.name}
        </Link>
      </td>
      <td>{person.sex}</td>
      <td>{person.born}</td>
      <td>{person.died}</td>
      <td>
        {linkWomansNames ? (
          <Link to={`/people/${womanSlug}`} className={classNames({ "has-text-danger": linkWomansNames })}>
            {person.motherName || '-'}
          </Link>
        ) : (
          <span>
            {person.motherName || '-'}
          </span>
        )}
      </td>
      <td>
        {linkMansNames ? (
          <Link to={`/people/${manSlug}`}>
            {person.fatherName || '-'}
          </Link>
        ) : (
          <span>
            {person.fatherName || '-'}
          </span>
        )}
      </td>
    </tr>
  );
};
