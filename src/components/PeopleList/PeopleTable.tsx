import React from 'react';
import { Person } from '../../types';
import { NavLink, useParams } from 'react-router-dom';
import cn from 'classnames';
import { PersonLink } from '../PersonLink/PersonLink';

type Propse = {
  people: Person[];
};

export const PeopleTable: React.FC<Propse> = ({ people }) => {
  const { personSlug } = useParams();

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

      {people.length === 0 ? (
        <p data-cy="noPeopleMessage">There are no people on the server</p>
      ) : (
        <tbody>
          {people.map(person => (
            <tr
              key={person.slug}
              data-cy="person"
              className={cn({
                'has-background-warning': person.slug === personSlug,
              })}
            >
              <td>
                <NavLink
                  to={`/people/${person.slug}`}
                  className={cn({ 'has-text-danger': person.sex === 'f' })}
                >
                  {person.name}
                </NavLink>
              </td>

              <td>{person.sex}</td>
              <td>{person.born}</td>
              <td>{person.died}</td>
              {person.mother ? (
                <td>
                  <PersonLink person={person.mother} />
                </td>
              ) : (
                <td>{person.motherName || '-'}</td>
              )}
              {person.father ? (
                <td>
                  <PersonLink person={person.father} />
                </td>
              ) : (
                <td>{person.fatherName || '-'}</td>
              )}
            </tr>
          ))}
        </tbody>
      )}
    </table>
  );
};
