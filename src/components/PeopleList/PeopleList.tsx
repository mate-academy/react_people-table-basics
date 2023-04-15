import React from 'react';
import { Link } from 'react-router-dom';
import classNames from 'classnames';
import { Person } from '../../types';
import { LinkType } from '../../types/Links';
import { PersonLink } from '../PersonLink/PersonLink';

type Props = {
  people: Person[],
  selectedSlug: string,
};

export const PeopleList: React.FC<Props> = ({ people, selectedSlug }) => {
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
          const hasFindMother = people
            .find(person => person.name === motherName);
          const hasFindFather = people
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
                  to={`${LinkType.PeoplePage}/${slug}`}
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
                { hasFindMother ? (
                  <PersonLink person={hasFindFather!} />
                ) : (
                  motherName || '-'
                )}
              </td>

              <td>
                { hasFindFather ? (
                  <PersonLink person={hasFindFather} />
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
