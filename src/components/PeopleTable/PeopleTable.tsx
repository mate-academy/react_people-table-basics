import React from 'react';
import { NavLink } from 'react-router-dom';
import classNames from 'classnames';
import { Person } from '../../types/Person';
import { PersonLink } from '../PersonLink/PersonLink';

type Props = {
  people: Person[];
  selectedSlug?: string;
};

export const PeopleTable: React.FC<Props> = ({ people, selectedSlug }) => {
  const peopleMap = Object.fromEntries(people.map(p => [p.name, p]));

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
              <NavLink
                to={`/people/${person.slug}`}
                className={classNames({
                  'has-text-danger': person.sex === 'f',
                })}
                data-cy="personLink"
              >
                {person.name}
              </NavLink>
            </td>
            <td>{person.sex}</td>
            <td>{person.born}</td>
            <td>{person.died}</td>
            <td>
              <PersonLink
                personName={person.motherName ?? ''}
                peopleMap={peopleMap}
              />
            </td>
            <td>
              <PersonLink
                personName={person.fatherName ?? ''}
                peopleMap={peopleMap}
              />
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};
