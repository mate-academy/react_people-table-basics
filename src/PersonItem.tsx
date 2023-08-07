import { Link, useLocation } from 'react-router-dom';
import cn from 'classnames';
import React from 'react';
import { Person } from './types';
import { PersonLink } from './PersonLink';

type Props = {
  person: Person,
};

export const PersonItem: React.FC<Props> = ({ person }) => {
  const currLocationLink = useLocation().pathname;

  const getMotherLink = (user: Person) => {
    return !user.mother ? (
      user.motherName
    ) : (
      <Link to={`${user.mother?.slug}`} className="has-text-danger" replace>
        {user.mother.name}
      </Link>
    );
  };

  const getFatherLink = (user: Person) => {
    return !user.father ? (
      user.fatherName
    ) : (
      <Link to={`${user.father?.slug}`} replace>
        {user.father.name}
      </Link>
    );
  };

  return (
    <tr
      data-cy="person"
      className={cn({
        'has-background-warning': currLocationLink === `/people/${person.slug}`,
      })}
    >
      <td>
        <PersonLink person={person} />
      </td>

      <td>{person.sex}</td>
      <td>{person.born}</td>
      <td>{person.died}</td>
      <td>
        {person.motherName ? getMotherLink(person) : '-'}
      </td>
      <td>
        {person.fatherName ? getFatherLink(person) : '-'}
      </td>
    </tr>
  );
};
