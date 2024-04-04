import React from 'react';
import classNames from 'classnames';
import { Link, useParams } from 'react-router-dom';
import { Person } from '../../types';

type PersonItemProps = {
  person: Person & {
    motherNameLink: string | null;
    fatherNameLink: string | null;
  };
};

export const PersonItem: React.FC<PersonItemProps> = ({ person: p }) => {
  const { personId } = useParams();
  const renderPersonName = (person: Person) => {
    return (
      <Link
        to={`/people/${person.slug}`}
        className={classNames({
          'has-text-danger': person.sex === 'f',
        })}
      >
        {person.name}
      </Link>
    );
  };

  return (
    <tr
      data-cy="person"
      key={p.slug}
      className={classNames({
        'has-background-warning': personId === p.slug,
      })}
    >
      <td>{renderPersonName(p)}</td>
      <td>{p.sex}</td>
      <td>{p.born}</td>
      <td>{p.died}</td>
      <td>
        {p.motherName ? (
          p.motherNameLink ? (
            <Link
              className="has-text-danger"
              to={`/people/${p.motherNameLink}`}
            >
              {p.motherName}
            </Link>
          ) : (
            <span>{p.motherName}</span>
          )
        ) : (
          '-'
        )}
      </td>
      <td>
        {p.fatherName ? (
          p.fatherNameLink ? (
            <Link to={`/people/${p.fatherNameLink}`}>{p.fatherName}</Link>
          ) : (
            <span>{p.fatherName}</span>
          )
        ) : (
          '-'
        )}
      </td>
    </tr>
  );
};
