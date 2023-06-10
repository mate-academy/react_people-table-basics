import React from 'react';
import { Link } from 'react-router-dom';

import classNames from 'classnames';

import { Person } from '../../types';
import { PageRoutes } from '../../types/PageRoutes';
import { PersonLink } from '../PersonLink/PersonLink';

interface PeopleListProps {
  people: Person[],
  selectedSlug: string,
}

export const PeopleList: React.FC<PeopleListProps> = (
  { people, selectedSlug },
) => {
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
        {people.map(({
          name,
          sex,
          born,
          died,
          fatherName,
          motherName,
          slug,
        }: Person) => {
          const mother = people
            .find(person => person.name === motherName);
          const father = people
            .find(person => person.name === fatherName);

          return (
            <tr
              data-cy="person"
              key={slug}
              className={classNames(
                { 'has-background-warning': slug === selectedSlug },
              )}
            >
              <td>
                <Link
                  to={`${PageRoutes.PeoplePage}/${slug}`}
                  className={classNames(
                    { 'has-text-danger': sex === 'f' },
                  )}
                >
                  {name}
                </Link>
              </td>

              <td>{sex}</td>
              <td>{born}</td>
              <td>{died}</td>

              <td>
                { mother ? (
                  <PersonLink person={mother} />
                ) : (
                  motherName || '-'
                )}
              </td>

              <td>
                { father ? (
                  <PersonLink person={father} />
                ) : (
                  fatherName || '-'
                )}
              </td>
            </tr>
          );
        })}

      </tbody>
    </table>
  );
};
