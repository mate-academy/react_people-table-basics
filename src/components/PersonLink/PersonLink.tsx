import React from 'react';
import { Person } from '../../types';
import { NavLink, useParams } from 'react-router-dom';
import classNames from 'classnames';

type Props = {
  person: Person;
};

export const PersonLink: React.FC<Props> = ({ person }) => {
  const { slug } = useParams();
  const noParent = '-';

  return (
    <tr
      data-cy="person"
      className={classNames({ 'has-background-warning': person.slug === slug })}
    >
      <td>
        <NavLink
          to={`/people/${person.slug}`}
          className={classNames({ 'has-text-danger': person.sex === 'f' })}
        >
          {person.name}
        </NavLink>
      </td>

      <td>{person.sex}</td>
      <td>{person.born}</td>
      <td>{person.died}</td>

      <td>
        {person.mother ? (
          <NavLink to={`/people/${person.mother.slug}`} className="has-text-danger">
            {person.motherName}
          </NavLink>
        ) : (
          person.motherName || noParent
        )}
      </td>
      <td>
        {person.father ? (
          <NavLink to={`/people/${person.father.slug}`}>{person.fatherName}</NavLink>
        ) : (
          person.fatherName || noParent
        )}
      </td>
    </tr>
  );
};
