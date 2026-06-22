import React from 'react';
import { Person } from '../types';
import cn from 'classnames';
import { Link } from 'react-router-dom';

type Props = {
  person: Person | string;
};

export const PersonLink: React.FC<Props> = ({ person }) => {
  const getNameClass = (currentPerson: Person) => {
    const isWoman = currentPerson.sex === 'f';

    return cn({ 'has-text-danger': isWoman });
  };

  return (
    <td>
      {typeof person === 'string' ? (
        person
      ) : (
        <Link className={getNameClass(person)} to={`/people/${person.slug}`}>
          {person.name}
        </Link>
      )}
    </td>
  );
};
