import React from 'react';
import { Person } from '../../types';
import { Link, useParams } from 'react-router-dom';
import classNames from 'classnames';

type Props = {
  person: Person;
  getParentForSlug: (value: string) => Person | undefined;
};

export const PersonLink: React.FC<Props> = ({ person, getParentForSlug }) => {
  const { slug } = useParams();

  const getFatherForSlug = getParentForSlug(person.fatherName as string);

  const getMotherForSlug = getParentForSlug(person.motherName as string);

  return (
    <tr
      data-cy="person"
      className={classNames({
        'has-background-warning': person.slug === slug,
      })}
    >
      <td>
        <Link
          to={`../${person.slug}`}
          className={classNames({ 'has-text-danger': person.sex === 'f' })}
        >
          {person.name}
        </Link>
      </td>

      <td>{person.sex}</td>
      <td>{person.born}</td>
      <td>{person.died}</td>

      {person.motherName && getMotherForSlug ? (
        <td>
          <Link to={`../${getMotherForSlug?.slug}`} className="has-text-danger">
            {person.motherName}
          </Link>
        </td>
      ) : (
        <td>{person.motherName || '-'}</td>
      )}

      {person.fatherName && getFatherForSlug ? (
        <td>
          <Link to={`../${getFatherForSlug?.slug}`}>{person.fatherName}</Link>
        </td>
      ) : (
        <td>{person.fatherName || '-'}</td>
      )}
    </tr>
  );
};
