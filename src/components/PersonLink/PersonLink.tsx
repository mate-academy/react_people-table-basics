import React from 'react';
import classNames from 'classnames';
import { Person } from '../../types';

interface Props {
  person: Person
}

export const PersonLink: React.FC<Props> = ({ person }) => {
  return (
    <tr data-cy="person">
      <td>
        <a
          href={`#/people/${person.slug}`}
          className={classNames({
            'has-text-danger': person.sex === 'f',
          })}
        >
          {person.name}
        </a>
      </td>

      <td>{person.sex}</td>
      <td>{person.born}</td>
      <td>{person.died}</td>
      <td>
        {
          person.motherName
            ? person.motherName
            : '-'
        }
      </td>
      <td>
        {
          person.fatherName
            ? person.fatherName
            : '-'
        }
      </td>
    </tr>
  );
};
