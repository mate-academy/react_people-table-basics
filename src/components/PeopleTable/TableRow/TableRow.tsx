import React, { memo } from 'react';
import { Person } from '../../../types/Person';
import { tableColumns } from '../tableColumns';
import classNames from 'classnames';

interface Props {
  person: Person;
  people: Person[];
  isSelected: boolean;
}

export const TableRow: React.FC<Props> = memo(
  ({ person, people, isSelected }) => (
    <tr
      data-cy="person"
      className={classNames({
        'has-background-warning': isSelected,
      })}
    >
      {tableColumns.map(({ key, render }) => (
        <td key={key}>{render ? render(person, people) : person[key]}</td>
      ))}
    </tr>
  ),
);

TableRow.displayName = 'TableRow';
