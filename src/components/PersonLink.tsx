import React from 'react';
import classNames from 'classnames';
import { Link, useParams } from 'react-router-dom';
import { Person } from '../types';

type Props = {
  person: Person,
};

const FEMALE = 'f';

export const PersonLink: React.FC<Props> = ({ person }) => {
  const { slug } = useParams();

  return (
    <tr
      data-cy="person"
      className={classNames(
        { 'has-background-warning': person.slug === slug },
      )}
    >
      <td>
        <Link
          to={`${person.slug}`}
          className={classNames(
            { 'has-text-danger': person.sex === FEMALE },
          )}
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
              to={`${person.mother.slug}`}
              className="has-text-danger"
            >
              {person.mother.name}
            </Link>
          ) : (
            person.motherName
          )}

      </td>
      <td>
        {person.father
          ? (
            <Link
              to={`${person.father.slug}`}
            >
              {person.father.name}
            </Link>
          ) : (
            person.fatherName
          )}
      </td>
    </tr>
  );
};
