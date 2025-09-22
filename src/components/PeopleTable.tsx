import React from 'react';
import classNames from 'classnames';
import { PersonLink } from './PersonLink';
import { Person } from '../types';

interface Props {
  people: Person[];
  peopleMap: Map<string, Person>;
  selectedSlug?: string;
}

export const PeopleTable: React.FC<Props> = ({
  people,
  peopleMap,
  selectedSlug,
}) => {
  const renderParent = (parentName: string | null | undefined) => {
    if (!parentName) {
      return '-';
    }

    const parent = peopleMap.get(parentName) || null;

    if (parent) {
      return <PersonLink person={parent} />;
    }

    return parentName;
  };

  return (
    <table
      data-cy="peopleTable"
      className="table is-striped is-hoverable is-narrow is-fullwidth"
    >
      <thead>
        <tr>
          <th>Name</th>
          <th>Sex</th>
          <th>Born</th>
          <th>Died</th>
          <th>Mother</th>
          <th>Father</th>
        </tr>
      </thead>
      <tbody>
        {people.map(person => (
          <tr
            key={person.slug}
            data-cy="person"
            className={classNames({
              'has-background-warning': person.slug === selectedSlug,
            })}
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
        ))}
      </tbody>
    </table>
  );
};
