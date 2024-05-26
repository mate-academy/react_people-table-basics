import React from 'react';
import { Person } from '../types';
import { Link, useParams } from 'react-router-dom';
import classNames from 'classnames';

interface Props {
  person: Person;
}

export const PeopleTable: React.FC<Props> = ({ person }) => {
  const { peopleSlug } = useParams();

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
        {person.mother
          ? (
            <Link
              to={`/people/${person.mother.slug}`}
              className={classNames(
                { "has-text-danger": person.mother.sex === 'f' },
              )}
            >
              {person.mother.name}
            </Link>
          )
          : person.motherName || '-'
        }
      </td>
      <td>
        {person.father
          ? (
            <Link
              to={`/people/${person.father.slug}`}
              className={classNames(
                { "has-text-danger": person.father.sex === 'f' },
              )}
            >
              {person.father.name}
            </Link>
          )
          : person.fatherName || '-'
        }
      </td>
    </tr>
  );
};
