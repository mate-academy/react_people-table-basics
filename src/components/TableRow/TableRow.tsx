import React from 'react';
import cn from 'classnames';
import { Person } from '../../types';

type Props = {
  person: Person;
};

export const TableRow: React.FC<Props> = React.memo(
  ({ person }) => {
    return (
      <tr data-cy="person">
        <td>
          <a
            href={`#/people/${person.slug}`}
            className={cn('todo', {
              'has-text-danger': person.sex === 'f',
            })}
          >
            {person.name}
          </a>
        </td>

        <td>{person.sex}</td>
        <td>{person.born}</td>
        <td>{person.died}</td>

        {person.motherName
          ? (
            <td>{person.motherName}</td>
          )
          : (
            <td>-</td>
          )}

        {person.fatherName
          ? (
            <td>{person.fatherName}</td>
          )
          : (
            <td>-</td>
          )}
      </tr>
    );
  },
);
