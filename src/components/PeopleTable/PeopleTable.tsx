import React, { memo } from 'react';
import classNames from 'classnames';

import { Person } from '../../types';
import { PersonLink } from '../PersonLink/PersonLink';
import { TABLE_CONFIG } from '../../constants';

interface PeopleTableProps {
  people: Person[];
  selectedPersonSlug?: string;
}

const renderParentCell = (
  person: Person | undefined,
  parentName: string | null,
) => {
  if (person) {
    return <PersonLink person={person} />;
  }

  return parentName || '-';
};

export const PeopleTable: React.FC<PeopleTableProps> = memo(
  ({ people, selectedPersonSlug }) => {
    return (
      <table
        data-cy="peopleTable"
        className="table is-striped is-hoverable is-narrow is-fullwidth"
      >
        <thead>
          <tr>
            {TABLE_CONFIG.COLUMN_NAMES.map(name => (
              <th key={name}>{name}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {people.map(person => (
            <tr
              data-cy="person"
              key={person.slug}
              className={classNames({
                'has-background-warning': person.slug === selectedPersonSlug,
              })}
            >
              <td>
                <PersonLink person={person} />
              </td>

              <td>{person.sex}</td>
              <td>{person.born}</td>
              <td>{person.died}</td>
              <td>{renderParentCell(person.mother, person.motherName)}</td>
              <td>{renderParentCell(person.father, person.fatherName)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    );
  },
);

PeopleTable.displayName = 'PeopleTable';
