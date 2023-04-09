import React from 'react';
import classNames from 'classnames';
import { Person } from '../../types';

type Props = {
  people: Person[];
  selectedPersonSlug: string;
};

export const PeopleTable: React.FC<Props> = ({
  people,
  selectedPersonSlug,
}) => {
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
        {people.map(person => {
          const {
            name,
            sex,
            born,
            died,
            fatherName,
            motherName,
            slug,
          } = person;

          const isMother = people.filter(personSearch => {
            return personSearch.name === motherName;
          })[0];

          const isFather = people.filter(personSearch => {
            return personSearch.name === fatherName;
          })[0];

          return (
            <tr
              key={slug}
              data-cy="person"
              className={classNames(
                {
                  'has-background-warning': selectedPersonSlug === slug,
                },
              )}
            >
              <td>
                <a
                  href={`#/people/${slug}`}
                  className={classNames(
                    { 'has-text-danger': sex === 'f' },
                  )}
                >
                  {name}
                </a>
              </td>

              <td>{sex}</td>
              <td>{born}</td>
              <td>{died}</td>
              <td>
                {isMother
                  ? (
                    <a
                      href={`#/people/${isMother.slug}`}
                      className="has-text-danger"
                    >
                      {isMother.name}
                    </a>
                  )
                  : motherName || '-'}
              </td>

              <td>
                {isFather
                  ? (
                    <a
                      href={`#/people/${isFather.slug}`}
                    >
                      {isFather.name}
                    </a>
                  )
                  : fatherName || '-'}
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};
