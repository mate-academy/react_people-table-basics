import classNames from 'classnames';
import React from 'react';
import { NavLink, useParams } from 'react-router-dom';
import { Person } from '../../../types';
import { ParentLink } from './ParentLink';

type Props = {
  people: Person[];
};

export const PeopleTable: React.FC<Props> = ({ people }) => {
  const { personSlug } = useParams();

  const findParent = (personName: string | null) => {
    const parent = people.find(person => person.name === personName);

    if (parent) {
      return (
        <ParentLink parent={parent} />
      );
    }

    return personName || '-';
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
            className={classNames(
              { 'has-background-warning': person.slug === personSlug },
            )}
          >
            <td>
              <NavLink
                to={`/people/${person.slug}`}
                className={() => classNames(
                  'link',
                  { 'has-text-danger': person.sex === 'f' },
                )}
              >
                {person.name}
              </NavLink>
            </td>

            <td>{person.sex}</td>
            <td>{person.born}</td>
            <td>{person.died}</td>
            <td>{findParent(person.motherName)}</td>
            <td>{findParent(person.fatherName)}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};
