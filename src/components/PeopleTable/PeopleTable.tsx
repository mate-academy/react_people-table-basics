import React from 'react';
import { NavLink } from 'react-router-dom';
import classNames from 'classnames';
import { PersonInfo } from '../PersonInfo';
import { Person } from '../../types';

interface Props {
  persons: Person[],
  slug: string | undefined,
}

export const PeopleTable: React.FC<Props> = ({ persons, slug }) => {
  const findParent = (ParentName: string | null) => {
    const parent = persons.find(person => person.name === ParentName);

    if (parent) {
      return (
        <NavLink
          to={`/people/${parent.slug}`}
          className={classNames({
            'has-text-danger': parent.sex === 'f',
          })}
        >
          {parent.name}
        </NavLink>
      );
    }

    return ParentName || '-';
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
        {persons.map(person => (
          <PersonInfo
            key={person.slug}
            person={person}
            slugCheck={slug}
            findParent={findParent}
          />
        ))}
      </tbody>
    </table>
  );
};
