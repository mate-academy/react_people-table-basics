import classNames from 'classnames';
import React from 'react';
import { Link } from 'react-router-dom';
import { Person } from '../types';

type Props = {
  person: Person | undefined;
  name:string | null;
};

export const PersonLink : React.FC <Props> = ({ person, name }) => {
  const nameCorrect = (!name) ? '-' : name;

  return (
    <td>
      { person === undefined
        ? nameCorrect
        : (
          <Link
            to={`../${person.slug}`}
            className={classNames(
              { 'has-text-danger': person.sex === 'f' },
            )}
          >
            {nameCorrect}
          </Link>
        )}
    </td>
  );
};
