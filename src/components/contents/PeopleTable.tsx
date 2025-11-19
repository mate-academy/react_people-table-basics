import React, { useMemo } from 'react';
import { Person } from '../../types';
import classNames from 'classnames';
import { PersonLink } from './PersonLink';

type Props = {
  people: Person[];
  selectedSlug?: string;
};

export const PersonTable: React.FC<Props> = ({ people, selectedSlug }) => {
  const isName = useMemo(
    () => new Map(people.map(p => [p.name, p] as const)),
    [people],
  );

  const tableHeaders = ['Name', 'Sex', 'Born', 'Died', 'Mother', 'Father'];

  const renderParent = (parentName: string | null | undefined) => {
    if (!parentName?.trim()) {
      return '-';
    }

    const parent = isName.get(parentName);

    return parent ? <PersonLink person={parent} /> : parentName;
  };

  return (
    <table
      data-cy="peopleTable"
      className="table is-striped is-hoverable is-narrow is-fullwidth"
    >
      <thead>
        <tr>
          {tableHeaders.map(header => (
            <th key={header}>{header}</th>
          ))}
        </tr>
      </thead>

      <tbody>
        {people.map(person => {
          const isSelected = person.slug === selectedSlug;

          return (
            <tr
              key={person.slug}
              data-cy="person"
              className={classNames({ 'has-background-warning': isSelected })}
            >
              <td>
                <PersonLink person={person} />
              </td>

              <td>{person.sex}</td>
              <td>{person.born}</td>
              <td>{person.died}</td>
              <td>{renderParent(person.motherName)}</td>
              <td>{renderParent(person.fatherName)}</td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};
